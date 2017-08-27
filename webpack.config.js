'use strict';

const path = require('path');
const args = require('minimist')(process.argv.slice(2));

// List of allowed environments
const allowedEnvs = ['dev', 'dist', 'test'];

// Set the correct environment
let env;
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'test';
} else if (args.env) {
  env = args.env;
} else {
  env = 'dev';
}
process.env.REACT_WEBPACK_ENV = env;
//2.x 的CLI参数到配置
// 替代地，现在提供了一个接口来传递参数给配置。我们应该采用这种新方式，在未来许多工具将可能依赖于此。
// webpack --env.customStuff

// module.exports = function(env) {
//   var customStuff = env.customStuff;
//   /* ... */
//   return config;
// };

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig(wantedEnv) {
  let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  let validEnv = isValid ? wantedEnv : 'dev';
  let config = require(path.join(__dirname, 'cfg/' + validEnv));
  return config;
}

module.exports = buildConfig(env);
