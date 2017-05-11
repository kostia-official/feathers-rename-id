const mongooseService = require('feathers-mongoose').Service;
const Service = require('../../dist/')(mongooseService);
const Post = require('./post-model');
const feathers = require('feathers');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const app = feathers();

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(rest())
  .use('/posts', new Service({
    Model: Post
  }))
  .use('/paginated-posts', new Service({
    Model: Post,
    paginate: {
      default: 10,
      max: 50
    }
  }));

module.exports = app;
