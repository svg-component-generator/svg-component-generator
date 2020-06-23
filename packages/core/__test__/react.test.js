const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const { generateSvgComponent } = require('../src');


const GenerateSvgComponentOptions = {
  target: 'React',
  isTest: true,
  typescript: true
};


test('Convert ActionsAggregate.svg to React Component', async () => {
  const filePath = path.resolve(__dirname, '../../../svgs/ActionsAggregate.svg');

  const source = fs.readFileSync(filePath, 'utf-8');

  const code = generateSvgComponent(source, {
    ...GenerateSvgComponentOptions,
    resourcePath: filePath
  });


  expect(code).toBe(fs.readFileSync(path.resolve(__dirname, './ActionsAggregate.react.jsx'), 'utf-8'));
});



test('Convert Circle.svg to React Component', async () => {
  const filePath = path.resolve(__dirname, '../../../svgs/Circle.svg');

  const source = fs.readFileSync(filePath, 'utf-8');

  const code = generateSvgComponent(source, {
    ...GenerateSvgComponentOptions,
    resourcePath: filePath
  });


  expect(code).toBe(fs.readFileSync(path.resolve(__dirname, './Circle.react.jsx'), 'utf-8'));
});
