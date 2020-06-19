const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const { generateComponentCode, generateComponentName } = require('../src/react');



test('Convert svg to React Component', async () => {
  const filePath = path.resolve(__dirname, '../../../svgs/ActionsAggregate.svg');

  const name = generateComponentName(filePath);

  const source = fs.readFileSync(filePath, 'utf-8');

  const code = generateComponentCode(name, source, { isTest: true });


  expect(code).toBe(fs.readFileSync(path.resolve(__dirname, './ActionsAggregate.react.jsx'), 'utf-8'));
});
