var express = require('express');
var router = express.Router();
var models = require('../db/models/index');

/* GET users listing. */
router.get('/', function(req,res,next){
  models.Director.findAll({})
    .then(function(directors){
      // sort by director id
      //directors.id.sort(function(a, b){return a-b});
      res.render('directors', {
        name: directors.name,
        directors: directors,
        id: directors.id
      });
      directors.sort();
    });
});

router.post('/', function(req, res, next) {
  models.Director.create({
    name: req.body.name
  }).then(function() {
    res.redirect('/directors')
  });
});

router.get('/new', function(req, res, next) {
  res.render('newdirectors');
});


router.get('/:id', function(req, res, next) {
  models.Director.findById(req.params.id).then(function(directors) {
    res.render('showdirectors', {directors: directors });
  });
});

router.delete('/:id', function(req, res, next) {
  models.Director.destroy({
    where: { id: req.params.id }
  }).then(function(directors) {
    res.redirect('/directors');
  });
});

router.get('/:id/edit', function(req, res, next) {
  models.Director.findById(req.params.id).then(function(directors) {
    res.render('editdirectors', { directors: directors });
  });
});

router.put('/:id', function(req, res, next) {
  models.Director.update({
    name: req.body.name
  }, { where: { id: req.params.id } }).then(function() {
    res.redirect('/directors');
  });
});



module.exports = router;
