var express = require('express');
var router = express.Router();
var models = require('../db/models/index');

/* GET users listing. */
router.get('/', function(req,res,next){
  models.Director.findAll({})
    .then(function(directors){
      res.render('directors/directors', {
        name: directors.name,
        directors: directors,
        id: directors.id
      });
    });
});

router.post('/', function(req, res, next) {
  models.Director.create({
    name: req.body.name
  }).then(function() {
    res.redirect('directors/directors')
  });
});

router.get('/new', function(req, res, next) {
  res.render('directors/newdirectors');
});


router.get('/:id', function(req, res, next) {
  models.Director.findById(req.params.id).then(function(directors) {
    res.render('directors/showdirectors', {directors: directors });
  });
});

router.delete('/:id', function(req, res, next) {
  models.Director.destroy({
    where: { id: req.params.id }
  }).then(function(directors) {
    res.redirect('directors/directors');

  });
});

router.get('/:id/edit', function(req, res, next) {
  models.Director.findById(req.params.id).then(function(directors) {
    res.render('directors/editdirectors', { directors: directors });
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
