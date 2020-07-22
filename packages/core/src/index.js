import * as ReactGenerator from './react';


export const Generators = {
  React: ReactGenerator,
  // Vue: VueGenerator
};

export function generateSvgComponent(source, options) {

  const Generator = Generators[options.component];

  const name = options.name ?
    (typeof options.name === 'string' ? options.name :
      options.name(options.resourcePath)) :
    Generator.generateComponentName(options.resourcePath);


  const code = Generator.generateComponentCode(name, source, options);

  return code
}
