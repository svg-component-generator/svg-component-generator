import * as ReactGenerator from './react';


interface IOptions {
  component: 'React';
  componentName: string;
  target?: 'js' | 'jsx';
  declaration?: boolean;
}

export const Generators = {
  React: ReactGenerator,
  // Vue: VueGenerator
};

export function generateSvgComponent(source: string, options: IOptions) {

  const Generator = Generators[options.component];

  const code = Generator.generateComponentCode(options.componentName, source, {
    target: options.target,
    declaration: options.declaration
  });

  return code
}
