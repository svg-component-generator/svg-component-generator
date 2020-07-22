import prettier from 'prettier';
const svgParser = require('svg-parser');
import {
  ConstantAcceptProperties,
  generateDefaultComponentProps
} from '../common/config';


const ConstantAcceptPropertyKeys = Object.keys(ConstantAcceptProperties);


function generateFixedPropertiesHtml(tagName, properties) {

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
function convertToReactProps(tagName, properties) {
  if (!Object.prototype.hasOwnProperty.call(ReactPropsMap, tagName)) {
    return properties;
  }

  const map = ReactPropsMap[tagName];

  return Object.keys(properties).reduce((props, key) => {
    if (Object.prototype.hasOwnProperty.call(map, key)) {
      props[map[key]] = properties[key];
    } else {
      props[key] = properties[key];
    }

    return props;
  }, {});

}


export function generateReactCode(name, source) {
  const parsed = svgParser.parse(source);

  const DefaultProps = generateDefaultComponentProps();

  const Shapes = { path: [], circle: [] };


  let html = '';
  function traverseAst(node, level) {
    if (node && node.type === 'element' && ConstantAcceptPropertyKeys.includes(node.tagName)) {
      html += `\n${level}<${node.tagName}`;

      const properties = convertToReactProps(node.tagName, node.properties);

      if (node.tagName === 'svg') {
        html += ` {...svgProps}`;
      } else {
        const elementId = node.tagName + (Shapes[node.tagName].length + 1);
        const configurableProps = ConstantAcceptProperties[node.tagName].configurable || [];

        DefaultProps[elementId] = configurableProps.reduce((props, name) => {
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
      node.children.forEach(subnode => traverseAst(subnode, level + '  '));
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

export default function ${name}(props) {
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
