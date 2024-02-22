module.exports = {
  mode: 'library',
  libraryName: 'cg',
  // 设置别名
  alias: {
    '@': 'src',
  },
  // doer默认会排除所有node_modules编译
  // 如果需要编译部分包，请在这里添加额外的需要编译的包名
  extraBabelCompileNodeModules: [],

  // 项目导出的共享资源
  exposes: {
    './style': './src/packages/style/index.js',
    './utils': './src/packages/utils/index.js',
    './service': './src/packages/service/index.js',
    './hooks': './src/packages/hooks/index.js',
    './store': './src/packages/store/index.js',
    './api': './src/packages/api/index.js',
    './Base': './src/packages/base/index.js',
    './Icon': './src/packages/icon/index.js',
    './ConfigProvider': './src/packages/configProvider/index.js',
    './Module': './src/packages/module/index.js',
    './Form': './src/packages/form/index.js',
    './FormBase': './src/packages/formBase/index.js',
    './Collapse': './src/packages/collapse/index.js',
    './Remote': './src/packages/remote/index.js',
    './Layout': './src/packages/layout/index.js',
    './Tab': './src/packages/tab/index.js',
    './Dnd': './src/packages/dnd/index.js',
    './Grid': './src/packages/grid/index.js',
    './Popover': './src/packages/popover/index.js',
    './Editor': './src/packages/editor/index.js',
    './Modal': './src/packages/modal/index.js',
    './Flow': './src/packages/flow/index.js',
    './Tree': './src/packages/tree/index.js',
    './Dropdown': './src/packages/dropdown/index.js',
  },
  shared: {},

  // 开启BrowserRouter模式
  browserHistory: false,

  plugins: [
    '@doerjs/plugin-less',
    [
      './plugin/monaco/index.js',
      {
        languages: ['javascript', 'json'],
      },
    ],
  ],

  // 自定义<Suspense fallback={<Loading />}> loading组件
  // 布局加载和页面加载公用一个loading
  // loading: './src/components/loading'
  // 或者 分别指定加载组件
  // loading: {
  //   layout: './src/layouts/loading',
  //   page: './src/components/loading',
  // },

  // 自定义边界错误捕获组件
  // 布局加载和页面加载公用一个error组件
  // error: './src/components/error'
  // 或者 分别指定error组件
  // error: {
  //   layout: './src/layouts/error',
  //   page: './src/components/error',
  // },
}
