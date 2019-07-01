var express = require('express');
var router = express.Router();

//requiring the controller file userRepos.js
var github = require('../controller/userRepos');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });  
 
//repositories route
router.post('/repos', github.reposAction);

//repositories with pagination route
router.post('/pagination', github.paginationAction);

module.exports = router;
