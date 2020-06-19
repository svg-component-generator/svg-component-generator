import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';
import { ReactGenerator } from '@svg-component-generator/core';
// import * as VueGenerator from './vue';


const Generators = {
  React: ReactGenerator,
  // Vue: VueGenerator
};


const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    target: {
      type: 'string',
      description: 'Which component you what'
    },
    name: {
      anyOf: [
        { instanceof: 'Function' },
        { type: 'string' }
      ]
    },
    isTest: {
      type: 'boolean'
    },
    generateInterface: {
      type: 'boolean'
    }
  }
};

export default async function (source) {

  const options = Object.assign({ target: 'React' }, getOptions(this));

  validateOptions(schema, options, 'svg component loader');


  if (!Object.prototype.hasOwnProperty.call(Generators, options.target)) {
    throw new Error(`options.target must be one of ` + Object.keys(Generators).join('/'));
  }

  const Generator = Generators[options.target];

  const name = options.name ?
    (typeof options.name === 'string' ? options.name :
      options.name.call(this, this.resourcePath)) :
    Generator.generateComponentName(this.resourcePath);

  const code = await Generator.generateComponentCode(name, source, {
    ...options,
    resourcePath: this.resourcePath
  });


  return options.isTest ? JSON.stringify(code) : code;

}


