import fs from 'fs';
import path from 'path';
import { convertToJs } from './convert-to-js';
import { generateReactCode } from './generate-code';
import { generateInterface } from './generate-interface';


export function generateComponentCode(name, source, options) {

  const { code: jsxComponentCode, elementIds } = generateReactCode(name, source);

  if (options.typescript) {
    const interfaceContent = generateInterface(name, elementIds);
    fs.writeFileSync(options.resourcePath + '.d.ts', interfaceContent);
  }

  const jsComponentCode = convertToJs(jsxComponentCode);
  return options.isTest ? jsxComponentCode : jsComponentCode;
}


export function generateComponentName(resourcePath) {
  return path.parse(resourcePath).name;
}
