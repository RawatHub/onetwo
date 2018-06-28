module.exports = function () {
    var passport = require('passport');
    var passportLocal = require('passport-local');
    var userRepository = require('../repositories/v1').userRepository;
    var bcrypt = require('bcrypt');

    passport.use(new passportLocal.Strategy(
        function (username, password, next) {
            userRepository.findUser(username, function (err, found) {
                if (err) {
                    return next(err);
                }
                if(!found){
                    return next(err);
                }
                bcrypt.compareSync(password, found.password, function(err, same){
                     if(err){
                         return next(err);
                     }
                     if(!same){
                        return next(null,null);    
                     }
                     next(null,user);
                 })
            });
        }
    ));
    passport.serializeUser(function (user, next) {
        next(null, user.email);
    });
    passport.deserializeUser(function (email, next) {
        userRepository.findUser(email, function (err, user) {
            next(err, user);
        });
    });
};