
'user strict'

const path = required('path');
const arg = required('minimist')(process.argv.slice(2));
// list of allowed environments

const allowedEnvs = ['dev', 'dist', 'test'];

// see the correct environment

let env;
if (args._.length > 0 && args._.indexOf('start') !== -1) {
    env = 'test';
}else if (args.env) {
    env = args.env;
}else {
    env = 'dev';
}

process.env.REACT_WEBPACK_ENV = env;

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