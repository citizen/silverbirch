exports.config = {
  modules: [
    "sass",
    "copy",
    "bower",
    "react",
    "server",
    "jshint",
    "csslint",
    "defeature",
    "minify-js",
    "minify-css",
    "browserify",
    "live-reload",
    "server-template-compile"
  ],
  server: {
    defaultServer: {
      enabled: true
    }
  },
  bower: {
    bowerDir: {
      clean: false
    },
    copy: {
      mainOverrides: {
        reactfire: [
          "dist/reactfire.js"
        ]
      }
    }
  },
  browserify: {
    bundles:[{
      entries: ['javascripts/main.js'],
      outputFile: 'main.bundled.js'
    }],
    firebase: {
      path: 'javascripts/vendor/firebase/firebase',
      exports: 'Firebase'
    }
  }
};
