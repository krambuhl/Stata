module.exports = function(config) {
  config.set({
    basePath: '',
    
    frameworks: ['mocha'],
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],

    preprocessors: { 'dist/stata.js': ['coverage'] },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },

    files: [
      'dist/stata.js',
      'test/**/*.js'
    ],
    
    exclude: [
      'test/vendor/**/*'
    ],

    port: 9876,
    logLevel: config.LOG_INFO,
    colors: true,
    singleRun: false
  });
};
