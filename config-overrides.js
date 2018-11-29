module.exports = function override(config, env) {
    config.module.rules.push({
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      });
    config.output.globalObject = 'this';
    config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = false;
    return config;
  }