import path from 'path';
import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';
import { Schema } from 'schema-utils/declarations/validate';
import { Generators, generateSvgComponent } from '@svg-component-generator/core';


const schema: Schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    target: {
      type: 'string',
      description: 'jsx,js'
    },
    component: {
      type: 'string',
      description: 'Which component you what'
    },
    componentName: {
      anyOf: [
        { instanceof: 'Function' },
        { type: 'string' }
      ]
    },
    declaration: {
      type: 'boolean'
    }
  }
};

export default async function (source: string) {

  const options = Object.assign({
    component: 'React',
    componentName: path.parse(this.resourcePath).name
  }, getOptions(this));

  validateOptions(schema, options, {
    name: 'svg component loader'
  });

  console.log(JSON.stringify(options));

  if (!Object.prototype.hasOwnProperty.call(Generators, options.component)) {
    throw new Error(`options.component must be one of ` + Object.keys(Generators!).join('/'));
  }


  const { jsxComponentCode } = generateSvgComponent(source, options);



  return jsxComponentCode;

}
