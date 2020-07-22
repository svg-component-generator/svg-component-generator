# @svg-component-generator/core

所有 `@svg-component-generator/*` 库的核心，可以运行在 `nodejs` 和 `浏览器` 环境。

## 安装
```bash
npm i @svg-component-generator/core -D
```

## 使用
```javascript
import { generateSvgComponent } from '@svg-component-generator/core';

const {
  jsComponentCode,
  jsxComponentCode,
  interfaceCode
} = generateSvgComponent(`
<svg class="icon" viewBox="0 0 1024 1024" >
  <path fill="#333333" d="M864 120a64 64 0 0 1 64 64v656a64 64 0 0 1-64 64H160a64 64 0 0 1-64-64V184a64 64 0 0 1 64-64h704z m-8 72H168v640h688V192z" />
  <path fill="#333333" d="M112 416h808v72H112z" />
  <path fill="#333333" d="M336 440h72v456h-72zM624 440h72v456h-72z" />
  <path fill="#333333" d="M112 632h808v72H112z" />
</svg>
`, {});
```
