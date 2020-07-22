const fs = require('fs');
const path = require('path');
const { generateSvgComponent } = require('../src');


const GenerateSvgComponentOptions = {
  component: 'React',
  target: 'jsx',
  declaration: true
};


test('Convert ActionsAggregate.svg to React Component', async () => {
  const filePath = path.resolve(__dirname, '../../../svgs/ActionsAggregate.svg');

  const source = fs.readFileSync(filePath, 'utf-8');

  const { jsxComponentCode } = generateSvgComponent(source, {
    ...GenerateSvgComponentOptions,
    componentName: path.parse(filePath).name
  });


  expect(jsxComponentCode).toBe(fs.readFileSync(path.resolve(__dirname, './ActionsAggregate.react.jsx'), 'utf-8'));
});



test('Convert Circle.svg to React Component', async () => {
  const filePath = path.resolve(__dirname, '../../../svgs/Circle.svg');

  const source = fs.readFileSync(filePath, 'utf-8');

  const { jsxComponentCode } = generateSvgComponent(source, {
    ...GenerateSvgComponentOptions,
    componentName: path.parse(filePath).name
  });


  expect(jsxComponentCode).toBe(fs.readFileSync(path.resolve(__dirname, './Circle.react.jsx'), 'utf-8'));
});
