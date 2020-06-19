
/**
 * 生成组件的类型声明文件
 */
export function generateInterface(name, paths) {

  const componentInterface = `
import * as React from 'react';


interface IPathProps {
  fill?: string;
  opacity?: number;
  fillOpacity?: number;
}

export interface IProps extends React.SVGAttributes<any> {
    ${paths.map(p => `${p}?: IPathProps;`).join('\n    ')}
}

export function ${name}(props:IProps): JSX.Element;
`;

  return componentInterface;
}
