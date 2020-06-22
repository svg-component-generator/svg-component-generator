import prettier from 'prettier';
const svgParser = require('svg-parser');


const AcceptProperties = {
  svg: ['viewBox'],
  path: ['d'],
  circle: ['cx', 'cy', 'r']
};

const PathDefaultProps = ['fill', 'opacity', 'fillOpacity'];


const CircleDefaultProps = ['fill', 'opacity'];


function generatePropertiesHtml(tagName, properties) {

  return Object.entries(properties).reduce((html, [name, value]) => {
    const acceptProperties = AcceptProperties[tagName] || [];
    if (acceptProperties.includes(name)) {
      html += ` ${name}="${value}"`;
    }
    return html;
  }, '');
}


function convertToReactProperties(properties) {
  const reactProperties = { ...properties };
  if (Object.prototype.hasOwnProperty.call(reactProperties, 'viewbox')) {
    reactProperties.viewBox = reactProperties.viewbox;
    delete reactProperties.viewbox;
  }

  if (Object.prototype.hasOwnProperty.call(reactProperties, 'fill-opacity')) {
    reactProperties.fillOpacity = reactProperties['fill-opacity'];
    delete reactProperties['fill-opacity'];
  }


  return reactProperties;
}


export function generateReactCode(name, source) {
  const parsed = svgParser.parse(source);

  const DefaultProps = {
    style: {
      width: '1em',
      height: '1em'
    }
  };

  let pathId = 0;
  let circleId = 0;

  const paths = [];
  const circles = [];

  let html = '';
  function traverseAst(node, level) {
    if (node && node.type === 'element' && Object.keys(AcceptProperties).includes(node.tagName)) {
      html += `\n${level}<${node.tagName}`;

      const properties = convertToReactProperties(node.properties);

      if (node.tagName === 'path') {
        pathId++;
        DefaultProps['path' + pathId] = PathDefaultProps.reduce((props, name) => {
          if (Object.prototype.hasOwnProperty.call(properties, name)) {
            props[name] = properties[name];
          }
          return props;
        }, {});

        html += ` {...mergedProps.path${pathId}}`;
        paths.push('path' + pathId);
      } else if (node.tagName === 'circle') {
        circleId++;
        DefaultProps['circle' + circleId] = CircleDefaultProps.reduce((props, name) => {
          if (Object.prototype.hasOwnProperty.call(properties, name)) {
            props[name] = properties[name];
          }
          return props;
        }, {});

        html += ` {...mergedProps.circle${circleId}}`;
        circles.push('circle' + circleId);
      } else if (node.tagName === 'svg') {
        html += ` {...svgProps}`;
      }

      html += generatePropertiesHtml(node.tagName, properties);
      html += '>';
      node.children.forEach(subnode => traverseAst(subnode, level + '  '));
      html += `</${node.tagName}>\n`;
    }
  }

  traverseAst(parsed.children[0], '');


  const code = (`
import * as React from 'react';
import merge from 'lodash/merge';

const DefaultProps = () => (${JSON.stringify(DefaultProps, null, 2)});

export function ${name}(props) {
  const mergedProps = merge(DefaultProps(), props);
  const shapes = ${JSON.stringify([...paths, ...circles])};

  const svgProps = Object.keys(mergedProps).reduce((newProps,key)=>{
    if(!shapes.includes(key)){
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
    paths
  };
}
