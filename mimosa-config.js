exports.config = {
  modules: [
    "copy",
    "server",
    "jshint",
    "csslint",
    // "require",
    "minify-js",
    "minify-css",
    "live-reload",
    "bower",
    "sass",
    "react",
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
    }
  }
};
