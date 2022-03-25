const { injectBabelPlugin } = require('react-app-rewired');
const rewireMobX = require('react-app-rewire-mobx');

module.exports = function override(config, env) {
  // do stuff with the webpack config...

  // antd 按需加载
  const configAntd = injectBabelPlugin(['import', [{
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: 'css'
  }]], config);

  // mobx 使用修饰器
  const configMobx = rewireMobX(configAntd, env);
  // 自定义eslnt
  for (var i = 0; i < configMobx.module.rules.length; i++) {
    if (configMobx.module.rules[i].enforce === 'pre') {
      configMobx.module.rules[i] = {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      };
    }
    if (configMobx.module.rules[i].oneOf && configMobx.module.rules[i].oneOf.length) {
      for (let j = 0; j < configMobx.module.rules[i].oneOf.length; j++) {
        const loaders = configMobx.module.rules[i].oneOf[j].loader;
        if (loaders && loaders.length) {
          let textIndex=-1;
          for (let k = 0; k < loaders.length; k++) {
            const loaderElement = loaders[k];
            if (loaderElement && loaderElement.loader && loaderElement.loader.indexOf('extract-text-webpack-plugin') !== -1) {
              textIndex=k;
            }
          }
          if(textIndex>-1){
            loaders.splice(textIndex,1);
          }
        }
      }
    }
  }
  return configMobx;
};