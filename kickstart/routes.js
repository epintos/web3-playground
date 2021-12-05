const routes = require('next-routes')(); // () because it returns a function that is invoked.

routes
  .add('/campaigns/new', '/campaigns/new') // Needs to be before the :address one
  .add('/campaigns/:address', '/campaigns/show')
  .add('/campaigns/:address/requests', '/campaigns/requests/index')
  .add('/campaigns/:address/requests/new', '/campaigns/requests/new');

module.exports = routes;
