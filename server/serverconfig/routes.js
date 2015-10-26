var bodyParser = require('body-parser');
/**
 * Routes for express app
 */

module.exports = function(app, passport) {
  app.use(bodyParser.json());
  app.use('/api/csv', require('../api/csv'));

  // ------------------------------------
  // View Rendering
  // ------------------------------------
  function getInitialState () {
    const counter = this.request.query.counter ?
      parseInt(this.request.query.counter) : 0;

    return new Promise(res => res({ counter }));
  }

  // app.use(require('../middleware/render-route')(getInitialState));

};
