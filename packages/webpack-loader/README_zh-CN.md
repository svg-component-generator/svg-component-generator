# @svg-component-generator/webpack-loader


## 安装
```bash
npm i @svg-component-generator/webpack-loader -D
```


## 使用
将 `@svg-component-generator/webpack-loader` 添加到 `webpack` 的 `rules` 配置中。

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

### 配置

#### component

类型: `React` 默认为: `React`

指定生成的组件类型


#### target
类型: `jsx | js` 默认为: `jsx`

指定生成的文件类型。如果为 `jsx` 则生成的代码中 `svg`标签将会以 `jsx` 的格式形式，一般需要再使用额外的  `loader` 继续处理。

#### declaration
类型: `Boolean` 默认为: `false`

指定是否生成类型文件(.d.ts)，如果设置为`true`，则类型文件会自动生成在图标在所文件夹中。
