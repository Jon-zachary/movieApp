var express = require('express');
var router = express.Router();
var models = require('../db/models/index.js');

router.delete('/:id', function(req,res,next){
  models.Movie.destroy({
    where: {id: req.params.id}
  }).then(function(movies) {
    res.redirect('/movies');
  });
});

router.get('/new', function(req, res, next) {
  res.render("movies/new");
});
//defines a route for the /movie page that passes the movies array to the ejs
//page where we use forEach to display the title.
router.get('/', function(req, res, next) {
 models.Movie.findAll({}).then(function(movies) {
    res.render('./movies/movies', {
      title: 'movies',
      movies: movies
    });

  });
});

router.get('/:id', function(req, res, next) {
  models.Movie.findById(req.params.id).then(function(movie) {
    res.render('movies/show', { movie: movie });
  });
});

router.get('/:id/edit', function(req, res, next) {
  models.Movie.findById(req.params.id).then(function(movie) {
    res.render('movies/edit', { movie: movie });
  });
});

router.put('/:id', function(req, res, next) {
  models.Movie.update({
    title: req.body.title,
    synopsis: req.body.synopsis,
  }, { where: { id: req.params.id } }).then(function() {
    res.redirect('/movies/' + req.params.id);
  });
});



router.post('/', function(req, res, next) {
  models.Movie.create({
    title: req.body.title,
    synopsis: req.body.synopsis
  }).then(function(movies) {
    res.redirect('/movies');
  });
});

module.exports = router;
