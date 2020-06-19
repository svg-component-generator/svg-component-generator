export default class SvgComponentGeneratorPlugin {
  apply(compiler) {

    compiler.hooks.emit.tapPromise('SvgComponentGeneratorPlugin', (compilation) => {
      compilation.assets['???'] = {
        source() {
          return '';
        }
      };
    });
  }
}
