/**
 * @jest-environment node
 */
const fs = require('fs');
const path = require('path');
const compiler = require('./compiler');

test('Webpack Loader', async () => {
  const stats = await compiler('../../../svgs/ActionsAggregate.svg', {
    component: 'React',
    target: 'jsx',
    declaration: true
  });

  const source = stats.toJson().modules[0].source;

  const expectJsx = JSON.stringify(fs.readFileSync(path.resolve(__dirname, '../../core/__test__/ActionsAggregate.react.jsx'), 'utf-8'));

  const expectOutput = `export default ${expectJsx};`;

  expect(source).toBe(expectOutput);
});
