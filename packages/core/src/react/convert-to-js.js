import { transform } from '@babel/core';

// process.env.BABEL_ENV = 'production';
// process.env.NODE_ENV = 'production';


/**
 * 将 ES6 代码转换成 ES5 代码
 */
export function convertToJs(code) {
  return transform(code, {
    plugins: [
      'transform-react-jsx',
      '@babel/plugin-transform-spread'
    ]
  }).code;
}
