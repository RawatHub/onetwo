var parentRepository = require('./parentRepository')();
var bcrypt = require('bcrypt');


var userRepository = function (entities) {
    var User = entities.userEntity;

    const getAllUsers = function (callback) {
        parentRepository.getAll(User, function (err, users) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, users);
            }
        });
    };

    const addUser = function (query, callback) {
        bcrypt.hash(query.password, 10, function (err, hash) {
            if (err) {
                return callback(err);
            }
            var newUser = new User({
                firstName: query.firstName,
                lastName: query.lastName,
                email: query.email,
                organizationId : query.organizationId,
                companyId : query.companyId,
                password: hash,
                accessString : [10,15,20,25,30, 35]
            });
            parentRepository.add(newUser, function (err, users) {
                if (err) {
                    err.message = err.message.replace(/document/g, 'user');
                    callback(err);
                } else {
                    callback(false, users);
                }
            });
        })
    };

    const updateUser = function (query, callback) {
        bcrypt.hash(query.password, 10, function (err, hash) {
            if (err) {
                return callback(err);
            }
            var newUser = {
                firstName: query.firstName,
                lastName: query.lastName,
                email: query.email,
                organizationId : query.organizationId,
                companyId : query.companyId,
                password: hash,
                accessString : [10,15,20,25,30, 35]
            };

            User.findOneAndUpdate({ 'email': query.email.toLocaleLowerCase() }, newUser, { upsert: true }, function (err, foundUser) {
                if (err) {
                    err.message = err.message.replace(/document/g, 'user');
                    callback(err);
                }
                else {
                    callback(false, foundUser);
                }
            });
        })
    }

    const findUser = function (email, callback) {
        console.log(email)
        User.findOne({ email: email.toLocaleLowerCase() }, function (err, user) {
            console.log(user);
            callback(err, user);
        });
    }

    return {
        getAllUsers: getAllUsers,
        addUser: addUser,
        updateUser: updateUser,
        findUser: findUser
    }
};

module.exports = userRepository;