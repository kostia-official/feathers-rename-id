const app = require('./app');
const test = require('ava');
const supertest = require('supertest')(app);

module.exports = { supertest, app, test };
