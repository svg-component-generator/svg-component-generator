# @svg-component-generator/webpack-loader


## Install
```bash
npm i @svg-component-generator/webpack-loader -D
```


## Usage
Add `@svg-component-generator/webpack-loader` to the rules config of the webpack.

```javascript
rules: [{
  test: /your-svg-folder\/.*\.svg$/,
  use: [
    {
      loader: '@svg-component-generator/webpack-loader',
      {
        component: 'React',
        target: 'jsx',
        declaration: true
      }
    }
  ]
}]
```


### Configuration

#### component

Type: `React` Default: `React`

Specifies the component type.


#### target
Type: `jsx | js` Default: `jsx`

Specifies the code

#### declaration
Type: `Boolean` Default: `false`

指定是否生成类型文件(.d.ts)，如果设置为`true`，则类型文件会自动生成在图标在所文件夹中。
