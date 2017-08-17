var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var knex = require('../db/knex.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/usersHome')
});

router.get('/create', function(req, res, next){
  res.render('users/create')
});

router.post('/create', function(req, res, next){
  if (req.body.password === req.body.confirm){
        bcrypt.hash(req.body.password, 7, function(err, hash){
          knex.raw(`insert into animals (name, password, species_id) values ('${req.body.username}', '${hash}', ${req.body.species_id})`)
            .then(function(){
              res.redirect('/users')
            })
        })
  }   else {
    res.redirect('/create')
  }
});

router.post('/login', function(req, res, next){
  knex.raw(`select * from animals where name = '${req.body.username}'`)
    .then(function(user){
      var userID = user.rows[0].id
      bcrypt.compare(req.body.password, user.rows[0].password, function(err, resp){
        if (resp) {
          res.cookie('unique_id', user.rows[0].id)
          res.redirect(`/users/${userID}`)
        } else {
          console.log(err)
            res.send("Login Failed")
        }
      })
    })
});

router.get('/:id', function(req, res, next){
  if(req.cookies.unique_id === req.params.id){
  var animalID = req.params.id;
  knex.raw(`select * from animals where animals.id = ${animalID}`)
    .then(function(data){
      res.render('users/singleUser', {data: data.rows[0]})
    })
  } else {
    res.send("Unauthorized Access")
  }
});

router.post('/logout', function(req, res, next){
  res.cookie('unique_id', null)
  res.redirect('/users')
})

module.exports = router;
