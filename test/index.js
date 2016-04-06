
var request = require('supertest')
  , express = require('express');

var app = require('../app');

describe('Index Page', function() {
  it('Ping index page', function(done) {
    request(app).get('/').expect(200, done);
  })
});
