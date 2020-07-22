const ShapeIProps = {
  path: {
    name: 'IPathProps',
    IProps: `
interface IPathProps {
  fill?: string;
  opacity?: number;
  fillOpacity?: number;
}`
  },
  circle: {
    name: 'ICircleProps',
    IProps: `
interface ICircleProps {
  fill?: string;
  opacity?: number;
}`
  }
};

const shapes = Object.keys(ShapeIProps) as Array<keyof typeof ShapeIProps>;

function getShapeWithElementId(elementId: string) {
  return shapes.find(shape => elementId.startsWith(shape));
}


/**
 * 生成组件的类型声明文件
 */
export function generateDeclaration(componentName: string, elementIds: string[]) {

  const componentDeclaration = `\
import * as React from 'react';

  ${shapes.map((shape) => {
    if (elementIds.find(elementId => elementId.startsWith(shape))) {
      return ShapeIProps[shape].IProps;
    }
    return '';
  }).join('\n')}

export interface IProps extends React.SVGAttributes<any> {
  ${elementIds.map((elementId) => {
    const shape = getShapeWithElementId(elementId);

    if (shape && ShapeIProps[shape]) {
      return `${elementId}?: ${ShapeIProps[shape].name};`;
    }

    return '';
  }).join('\n  ')}
}

export default function ${componentName}(props:IProps): JSX.Element;
`;

  return componentDeclaration;
}
