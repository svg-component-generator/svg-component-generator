import { transform } from '@babel/core';


export function convertToJs(code: string) {
  return transform(code, {
    plugins: [
      'transform-react-jsx',
      '@babel/plugin-transform-spread'
    ]
  })?.code ?? '';
}
