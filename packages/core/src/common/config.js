
/**
 * fixed: fixed props from svg
 * configurable: configurable props from Component usage
 */
export const ConstantAcceptProperties = {
  svg: {
    fixed: ['viewBox']
  },
  path: {
    fixed: ['d'],
    configurable: ['fill', 'opacity', 'fillOpacity', 'stroke', 'pathLength']
  },
  circle: {
    fixed: ['cx', 'cy', 'r', 'strokeWidth'],
    configurable: ['fill', 'opacity', 'stroke']
  },
  ellipse: {
    fixed: ['cx', 'cy', 'rx', 'ry'],
    configurable: ['fill', 'opacity', 'stroke']
  },
  rect: {
    fixed: ['x', 'y', 'rx', 'ry', 'width', 'height', 'strokeWidth'],
    configurable: ['fill', 'opacity', 'stroke']
  },
  line: {
    fixed: ['x1', 'y1', 'x2', 'y2'],
    configurable: ['fill', 'opacity', 'stroke']
  },
  polyline: {
    fixed: ['points'],
    configurable: ['fill', 'opacity', 'stroke']
  }
};



export const generateDefaultComponentProps = () => ({
  style: {
    width: '1em',
    height: '1em'
  }
});
