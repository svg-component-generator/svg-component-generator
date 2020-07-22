import prettier from 'prettier';
const svgParser = require('svg-parser');
import {
  ConstantAcceptProperties,
  generateDefaultComponentProps
} from '../config';


const ConstantAcceptPropertyKeys = Object.keys(ConstantAcceptProperties);


function generateFixedPropertiesHtml(
  tagName: keyof typeof ConstantAcceptProperties,
  properties: { [key: string]: string | number }
) {

  const fixedProperties = ConstantAcceptProperties[tagName] ?
    (ConstantAcceptProperties[tagName].fixed || []) :
    [];

  return Object.entries(properties).reduce((html, [name, value]) => {
    if (fixedProperties.includes(name)) {
      html += ` ${name}="${value}"`;
    }
    return html;
  }, '');
}


const ReactPropsMap = {
  svg: {
    'viewbox': 'viewBox'
  },
  path: {
    'fill-opacity': 'fillOpacity',
    'stroke-width': 'strokeWidth'
  },
  circle: {
    'stroke-width': 'strokeWidth'
  }
};


/**
 * convert svg properties to React props
 * @param {*} tagName string
 * @param {*} properties object
 */
function convertToReactProps(
  tagName: keyof typeof ReactPropsMap,
  properties: { [key: string]: string | number }
) {
  if (!Object.prototype.hasOwnProperty.call(ReactPropsMap, tagName)) {
    return properties;
  }

  const map = ReactPropsMap[tagName] as { [key: string]: any };

  return Object.keys(properties).reduce((props, key) => {
    if (Object.prototype.hasOwnProperty.call(map, key)) {
      props[map[key]] = properties[key];
    } else {
      props[key] = properties[key];
    }

    return props;
  }, {} as { [key: string]: any });

}


export function generateReactCode(componentName: string, source: string) {
  const parsed = svgParser.parse(source);

  const DefaultProps = generateDefaultComponentProps();

  const Shapes: { [key: string]: string[] } = { path: [], circle: [] };


  let html = '';
  function traverseAst(node: any, level: string) {
    if (node && node.type === 'element' && ConstantAcceptPropertyKeys.includes(node.tagName)) {
      html += `\n${level}<${node.tagName}`;

      const properties = convertToReactProps(node.tagName, node.properties);

      if (node.tagName === 'svg') {
        html += ` {...svgProps}`;
      } else {
        const elementId = node.tagName + (Shapes[node.tagName].length + 1);
        const configurableProps = (<any>ConstantAcceptProperties)[node.tagName].configurable || [];

        DefaultProps[elementId] = configurableProps.reduce((props: any, name: string) => {
          if (Object.prototype.hasOwnProperty.call(properties, name)) {
            props[name] = properties[name];
          }
          return props;
        }, {});

        html += ` {...mergedProps.${elementId}}`;
        Shapes[node.tagName].push(elementId);
      }

      html += generateFixedPropertiesHtml(node.tagName, properties);
      html += '>';
      node.children.forEach((subnode: any) => traverseAst(subnode, level + '  '));
      html += `</${node.tagName}>\n`;
    }
  }

  traverseAst(parsed.children[0], '');


  const elementIds = Object.values(Shapes).reduce((elementIds, ids) => {
    return elementIds.concat(ids);
  }, []);

  const code = (`
import * as React from 'react';
import merge from 'lodash/merge';

const DefaultProps = () => (${JSON.stringify(DefaultProps, null, 2)});

export default function ${componentName}(props) {
  const mergedProps = merge(DefaultProps(), props);
  const elementIds = ${JSON.stringify(elementIds)};

  const svgProps = Object.keys(mergedProps).reduce((newProps,key)=>{
    if(!elementIds.includes(key)){
      newProps[key] = mergedProps[key];
    }
    return newProps;
  },{});

  return (
    ${html}
  );
}`);


  return {
    code: prettier.format(code, {
      parser: 'babel',
      semi: true,
      trailingComma: 'none'
    }),
    elementIds
  };
}
