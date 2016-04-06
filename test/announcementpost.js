var request = require('supertest')
  , express = require('express')
  , assert = require('assert'),
  moment = require('moment')
  models = require('../models');
var app = require('../app');


describe (' announcement test', function(){
it('can creat new announcement post', function(done){
  models.Announcement.create({
      content: "Hi yuanyuan",
      location: "shanghai",
      timestamp: moment().format('MMMM Do, h:mm:ss a'),
      UserId: 2
  }).then(function(chat){
    assert.equal('Hi yuanyuan',chat.content);
    // The correct code is "redirect"
    done();
    });
  });

  it('get announcement with others success', function(done){
    models.Announcement.findAll({include: {model: models.User, as: 'User'}}).then(function(chat){
      assert.equal('Hi yuanyuan', chat[0].content);
      done();
  });
});
});
describe('Post announcement API', function(){
    var Cookies = null;
    it('post announcement', function(done){
        var announcement  = {
          UserId: 3,
          content: 'where you are',
          timestamp: moment().format('MMMM Do, h:mm:ss a'),
          location: 'jiangxi'
        };
        request(app).post('/announcement/')
        .send(announcement)
        .expect(302) // The correct code is "redirect"
        .end(function(err, res) {
          Cookies = res.headers['set-cookie'].pop().split(';')[0];
          console.log(Cookies);
          done();
        });
    });
  });
