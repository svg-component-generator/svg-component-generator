import * as React from 'react';

  
interface IPathProps {
  fill?: string;
  opacity?: number;
  fillOpacity?: number;
}


export interface IProps extends React.SVGAttributes<any> {
  path1?: IPathProps;
  path2?: IPathProps;
  path3?: IPathProps;
  path4?: IPathProps;
}

export function ActionsAggregate(props:IProps): JSX.Element;
