/**
 * @jest-environment node
 */
import compiler from './compiler.js';

test('Webpack Loader', async () => {
  const stats = await compiler('../../../svgs/ActionsAggregate.svg', {
    target: 'React',
    isTest: true,
    declaration: true
  });
  const output = JSON.stringify(stats.toJson().modules[0].source);

  expect(output).toBe("\"\\\"\\\\nimport * as React from 'react';\\\\nimport merge from 'lodash/merge';\\\\n\\\\nconst DefaultProps = () => ({\\\\n  \\\\\\\"style\\\\\\\": {\\\\n    \\\\\\\"width\\\\\\\": \\\\\\\"1em\\\\\\\",\\\\n    \\\\\\\"height\\\\\\\": \\\\\\\"1em\\\\\\\"\\\\n  },\\\\n  \\\\\\\"path1\\\\\\\": {\\\\n    \\\\\\\"fill\\\\\\\": \\\\\\\"#333333\\\\\\\"\\\\n  },\\\\n  \\\\\\\"path2\\\\\\\": {\\\\n    \\\\\\\"fill\\\\\\\": \\\\\\\"#333333\\\\\\\"\\\\n  },\\\\n  \\\\\\\"path3\\\\\\\": {\\\\n    \\\\\\\"fill\\\\\\\": \\\\\\\"#333333\\\\\\\"\\\\n  },\\\\n  \\\\\\\"path4\\\\\\\": {\\\\n    \\\\\\\"fill\\\\\\\": \\\\\\\"#333333\\\\\\\"\\\\n  }\\\\n});\\\\n\\\\nexport function ActionsAggregate(props) {\\\\n  const mergedProps = merge(DefaultProps(), props);\\\\n  const paths = [\\\\\\\"path1\\\\\\\",\\\\\\\"path2\\\\\\\",\\\\\\\"path3\\\\\\\",\\\\\\\"path4\\\\\\\"];\\\\n  const svgProps = Object.keys(mergedProps).reduce((newProps,key)=>{\\\\n    if(!paths.includes(key)){\\\\n      newProps[key] = mergedProps[key];\\\\n    }\\\\n    return newProps;\\\\n  },{});\\\\n\\\\n  return (\\\\n    \\\\n<svg {...svgProps} viewBox=\\\\\\\"0 0 1024 1024\\\\\\\">\\\\n <path {...mergedProps.path1} d=\\\\\\\"M864 120a64 64 0 0 1 64 64v656a64 64 0 0 1-64 64H160a64 64 0 0 1-64-64V184a64 64 0 0 1 64-64h704z m-8 72H168v640h688V192z\\\\\\\"></path>\\\\n\\\\n <path {...mergedProps.path2} d=\\\\\\\"M112 416h808v72H112z\\\\\\\"></path>\\\\n\\\\n <path {...mergedProps.path3} d=\\\\\\\"M336 440h72v456h-72zM624 440h72v456h-72z\\\\\\\"></path>\\\\n\\\\n <path {...mergedProps.path4} d=\\\\\\\"M112 632h808v72H112z\\\\\\\"></path>\\\\n</svg>\\\\n\\\\n  );\\\\n}\\\"\"");
});
