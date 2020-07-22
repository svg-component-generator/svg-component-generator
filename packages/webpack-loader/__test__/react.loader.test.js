/**
 * @jest-environment node
 */
import fs from 'fs';
import path from 'path';
import compiler from './compiler.js';

test('Webpack Loader', async () => {
  const stats = await compiler('../../../svgs/ActionsAggregate.svg', {
    component: 'React',
    target: 'jsx',
    typescript: true
  });

  const output = stats.toJson().modules[0].source;

  const expectJsx = JSON.stringify(fs.readFileSync(path.resolve(__dirname, '../../core/__test__/ActionsAggregate.react.jsx'), 'utf-8'));

  const expectOutput = `export default ${expectJsx};`;

  expect(output).toBe(expectOutput);
});
