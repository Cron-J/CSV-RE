require('babel/register');

const devServer = require('../build/webpack-dev-server'),
      config    = require('../config'),
      serve = require('serve-static');

const port = config.get('webpack_port');
const paths = config.get('utils_paths');

// static path
devServer.use(serve(paths.publicpath('')));

devServer.listen(port, 'localhost', function () {
  console.log('Webpack dev server running at localhost:' + port);
});
