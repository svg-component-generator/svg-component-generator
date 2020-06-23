import * as React from "react";
import merge from "lodash/merge";

const DefaultProps = () => ({
  style: {
    width: "1em",
    height: "1em"
  },
  path1: {
    fill: "#333333"
  },
  path2: {
    fill: "#333333"
  },
  path3: {
    fill: "#333333"
  },
  path4: {
    fill: "#333333"
  }
});

export function ActionsAggregate(props) {
  const mergedProps = merge(DefaultProps(), props);
  const elementIds = ["path1", "path2", "path3", "path4"];

  const svgProps = Object.keys(mergedProps).reduce((newProps, key) => {
    if (!elementIds.includes(key)) {
      newProps[key] = mergedProps[key];
    }
    return newProps;
  }, {});

  return (
    <svg {...svgProps} viewBox="0 0 1024 1024">
      <path
        {...mergedProps.path1}
        d="M864 120a64 64 0 0 1 64 64v656a64 64 0 0 1-64 64H160a64 64 0 0 1-64-64V184a64 64 0 0 1 64-64h704z m-8 72H168v640h688V192z"
      ></path>

      <path {...mergedProps.path2} d="M112 416h808v72H112z"></path>

      <path
        {...mergedProps.path3}
        d="M336 440h72v456h-72zM624 440h72v456h-72z"
      ></path>

      <path {...mergedProps.path4} d="M112 632h808v72H112z"></path>
    </svg>
  );
}
