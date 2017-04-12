const { test, supertest } = require('./env');
const { ObjectId } = require('mongoose').mongo;

const newPost = () => ({
  id: String(new ObjectId()),
  name: Date.now().toString()
});

test('id', async (t) => {
  const { body: post } = await supertest.post('/posts').send(newPost());
  const { body: got } = await supertest.get('/posts/' + post.id);
  const { body: updated } = await supertest.patch('/posts/' + post.id).send({ name: Date.now() });
  const { body: put } = await supertest.put('/posts/' + post.id).send({ name: Date.now() });
  const { body: deleted } = await supertest.delete('/posts/' + post.id);

  t.is(post.id, post.id);
  t.is(got.id, post.id);
  t.is(updated.id, post.id);
  t.is(put.id, post.id);
  t.is(deleted.id, post.id);
});

test('params', async (t) => {
  const { body: post } = await supertest.post('/posts').send(newPost());
  const { body: got } = await supertest.get('/posts/' + post.id).query({ id: post.id });
  const { body: found } = await supertest.get('/posts/').query({ id: post.id }).send({ name: 'new' });
  const { body: updated } = await supertest.patch('/posts/').query({ id: post.id }).send({ name: 'new' });
  const { body: deleted } = await supertest.delete('/posts/').query({ id: post.id });

  t.is(post.id, post.id);
  t.is(got.id, post.id);
  t.is(found[0].id, post.id);
  t.is(updated[0].id, post.id);
  t.is(deleted[0].id, post.id);
});
