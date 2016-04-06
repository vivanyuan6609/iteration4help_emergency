/**
 * Created by danyang on 3/2/16.
 */
var models = require('../models');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var request = require('request');
var sqlite3 = require('sqlite3').verbose();
var dbhandler = new Object();

console.Error = function (label, err) {
    console.error("\033[31m",label,"\033[0m",err)
}

dbhandler.connect = function () {
    dbhandler.db = new sqlite3.Database('ssnoc.dev.db');
}
dbhandler.close = function () {
    dbhandler.db.close(function (err) {
        if (err)
            console.Error("database close error: ", err)
    });
}

dbhandler.get_talk = function (from, to, callback) {
    dbhandler.connect();
    var query = "SELECT * FROM `Chats` WHERE (from_user =? AND to_user=? )OR(to_user =? AND from_user =?)";

    dbhandler.db.all(query,from,to,from,to,function (err, rows) {
        if (err)
            console.Error("Get talk error: ", err)
        callback(err, rows)
    });
    this.close()
}

router.get('/privatetalks', function (req, res) {
   var from = req.query.fromId
   var to = req.query.toId

   console.log("-----------");
   console.log(from);
   console.log(to);
   console.log("-----------");
   dbhandler.get_talk(from, to, function (err, post) {
       if (!err){
        res.json(post);
      }
   });
});

module.exports = router;
