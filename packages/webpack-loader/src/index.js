import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';
import { Generators, generateSvgComponent } from '@svg-component-generator/core';


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
    typescript: {
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

  options.resourcePath = this.resourcePath;

  const code = generateSvgComponent(source, options);



  return options.isTest ? JSON.stringify(code) : code;

}


