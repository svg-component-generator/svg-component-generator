import * as React from "react";
import merge from "lodash/merge";

const DefaultProps = () => ({
  style: {
    width: "1em",
    height: "1em"
  },
  circle1: {}
});

export default function Circle(props) {
  const mergedProps = merge(DefaultProps(), props);
  const elementIds = ["circle1"];

  const svgProps = Object.keys(mergedProps).reduce((newProps, key) => {
    if (!elementIds.includes(key)) {
      newProps[key] = mergedProps[key];
    }
    return newProps;
  }, {});

  return (
    <svg {...svgProps} viewBox="0 0 120 120">
      <circle {...mergedProps.circle1} cx="60" cy="60" r="50"></circle>
    </svg>
  );
}
