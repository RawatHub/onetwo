var express = require('express');
var passport = require('passport');
var restrict = require('../../auth/restrict');
var router = express.Router();
var config = require('../../config');
var path = require('path');
var jwt = require('jsonwebtoken');

var jsonPath = path.join(__dirname, '..', '..');
const models =  require(jsonPath + '/models/v1'); 
const entities = require(jsonPath + '/entities/v1');
const puppeteers = require(jsonPath + '/puppeteers/v1');

const userPuppeteer = puppeteers.userPuppeteer(entities);

//router.use('/', restrict);
router.route('/').get(userPuppeteer.getAllUsers);

//router.use('/add', restrict);
router.post('/add', userPuppeteer.addUser);

router.use('/update', restrict);
router.post('/update', userPuppeteer.updateUser);

router.use('/find/:id', restrict);
router.route('/find/:id').get(userPuppeteer.findUser);

router.get('/logout', function (req, res, next) {
    req.logout();
    req.redirect('/');
});

router.post('/authenticate', function (req, res) {
    var user = req.body;
    models.response = {};
    userPuppeteer.authenticateUser(user.email, user.password, function (error, validuser) {
        
      if (error) {
        models.response.result = false;
        models.response.error = error;
        res.status(200).json(models.response);
      } else if (validuser) {
        models.response.result = true;
        var token = jwt.sign(user, config.secret, {
          expiresIn: 1440 // expires in 24 hours
        });
        models.response.error = null;
        models.response.data = token;
        res.status(200).json(models.response);
      } else {
        models.response.result = false;
        models.response.error = { userError: 'I don\'t recognize you'};
        res.status(401).json(models.response);
      }
    });
  });

module.exports = router;
