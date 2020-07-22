import { convertToJs } from './convert-to-js';
import { generateReactCode } from './code';
import { generateDeclaration } from './declaration';


export function generateComponentCode(
  componentName: string,
  source: string,
  options: {
    target?: 'js' | 'jsx';
    declaration?: boolean;
  }
) {

  if (!options.target) {
    options.target = 'js';
  }

  const { code: jsxComponentCode, elementIds } = generateReactCode(componentName, source);

  const result: {
    jsxComponentCode: string;
    interfaceCode?: string;
    jsComponentCode?: string;
  } = {
    jsxComponentCode
  };

  if (options.target === 'js') {
    result.jsComponentCode = convertToJs(jsxComponentCode);
  }

  if (options.declaration) {
    result.interfaceCode = generateDeclaration(componentName, elementIds);
  }


  return result;
}
