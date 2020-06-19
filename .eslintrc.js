module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 6,
    "project": "./tsconfig.json",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  "plugins": [
    "react-hooks",
    "@typescript-eslint",
    "unicorn"
  ],
  "rules": {
    "semi": 1,
    "no-empty": 1,
    "quotes": [1, "single", {
      allowTemplateLiterals: true
    }],
    // Interface 名称可以以 I 开头
    "@typescript-eslint/interface-name-prefix": 0,

    // 函数可以自动推导返回类型
    "@typescript-eslint/explicit-function-return-type": 0,

    // 允许使用 any
    "@typescript-eslint/no-explicit-any": 0,

    // 允许函数在函数调用之后（函数声明会自动提升）
    "@typescript-eslint/no-use-before-define": 0,

    // 检查 Hook 的规则
    "react-hooks/rules-of-hooks": "error",
    // 检查 effect 的依赖
    // "react-hooks/exhaustive-deps": "warn",

    "@typescript-eslint/no-unnecessary-type-assertion": 1,

    "@typescript-eslint/no-unused-vars": [1, {
      argsIgnorePattern: "^_",
      ignoreRestSiblings: true
    }],

    /**
     * 正则表达式中有些特殊字符是不需要反斜杠转义的
     * 我们这里忽略这个检查
     */
    "no-useless-escape": 0,

    /**
     * 需要清除代码中的`console`
     */
    "no-console": 1,


    /**
     * 函数不能为空
     */
    "no-empty-function": 1,

    "@typescript-eslint/no-non-null-assertion": 0,

    "@typescript-eslint/no-empty-function": 0,

    "@typescript-eslint/no-inferrable-types": [1, {
      ignoreParameters: false,
      ignoreProperties: false,
    }],

    // prop-types检查
    "react/prop-types": 0,

    "import/no-unresolved": 0,
    "import/default": 0,
    "import/no-named-as-default": 0,
    "import/no-default-export": 1,

    // 文件名必须使用短线连接
    "unicorn/filename-case": 1,

    // 不限制空行数
    "prettier/prettier": [0, {
      "endOfLine": "auto"
    }],

    // 连续空行的数量限制
    "no-multiple-empty-lines": [
      2,
      {
        max: 3, // 文件内最多连续3个空行
        maxEOF: 1, // 文件末尾最多连续1个空行
        maxBOF: 1 // 文件头最多连续1个空行
      }
    ]
  },
  settings: {
    react: {
      version: "16.12.0"
    }
  }
};
