var express = require('express');
var router = express.Router();
var models = require('../db/models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/direc', function(req, res, next) {
  res.send('test');
});


module.exports = router;
