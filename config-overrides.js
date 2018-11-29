module.exports = function override(config, env) {
    config.module.rules.push({
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      });
    config.output.globalObject = 'this';
    if(config.optimization.minimizer && config.optimization.minimizer.length > 0){
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = false;
    }
    return config;
  }