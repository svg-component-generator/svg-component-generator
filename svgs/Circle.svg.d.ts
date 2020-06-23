import * as React from 'react';

  

interface ICircleProps {
  fill?: string;
  opacity?: number;
}

export interface IProps extends React.SVGAttributes<any> {
  circle1?: ICircleProps;
}

export function Circle(props:IProps): JSX.Element;
