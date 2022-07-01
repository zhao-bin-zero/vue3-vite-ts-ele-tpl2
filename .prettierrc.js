module.exports = {
  printWidth: 130, // 超过最大值换行
  tabWidth: 2, // 缩进字节数
  useTabs: false, // 缩进不使用tab，使用空格
  semi: false, // 句尾添加分号
  vueIndentScriptAndStyle: true, // 缩进Vue文件中的脚本和样式标签
  singleQuote: true, // 使用单引号代替双引号
  quoteProps: 'as-needed', // 仅在需要时在对象属性周围添加引号
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  trailingComma: 'none', // 在对象或数组最后一个元素后面是否加逗号
  jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  arrowParens: 'always', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号 always：一直有括号
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'never', // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  htmlWhitespaceSensitivity: 'strict',  // 空格被认为是敏感的
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto
  rangeStart: 0
}
