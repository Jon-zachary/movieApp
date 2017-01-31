var express = require('express');
var router = express.Router();
var models = require('../db/models/index.js');


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

module.exports = router;

