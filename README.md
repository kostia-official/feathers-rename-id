[![Build Status](https://travis-ci.org/kozzztya/feathers-rename-id.svg?branch=master)](https://travis-ci.org/kozzztya/feathers-rename-id)
[![codecov](https://codecov.io/gh/kozzztya/feathers-rename-id/branch/master/graph/badge.svg)](https://codecov.io/gh/kozzztya/feathers-rename-id)

# feathers-rename-id

Can change "_id" to "id" for all requests.

## Configure

```js
const mongooseService = require('feathers-mongoose').Service;
const Service = require('feathers-rename-id')(mongooseService);
const Post = require('./post-model');

module.exports = function() {
  const app = this;
  
  app.use('/posts', new Service({
    Model: Post,
    newIdName: 'id' // Default value - 'id'
  }));
};
```

## Usage

```js
const post = await app.service('/posts').create({ id, text });
const got = await app.service('/posts').get(post.id);
const found = await app.service('/posts').find({ query: { id: post.id } });
const patched = await app.service('/posts').patch(null, { text }, { query: { id: post.id } });
const updated = await app.service('/posts').update(null, { text }, { query: { id: post.id } });
const removed = await app.service('/posts').remove(null, { query: { id: post.id } });
```
