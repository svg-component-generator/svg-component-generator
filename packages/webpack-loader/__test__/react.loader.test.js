/**
 * @jest-environment node
 */
import compiler from './compiler.js';

test('Webpack Loader', async () => {
  const stats = await compiler('../../../svgs/ActionsAggregate.svg', {
    target: 'React',
    isTest: true,
    generateInterface: true
  });
  const output = JSON.stringify(stats.toJson().modules[0].source);

  expect(typeof output).toBe("string");
});
