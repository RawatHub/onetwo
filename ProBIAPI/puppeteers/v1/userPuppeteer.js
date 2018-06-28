const repositories =  require(__dirname + '/../../repositories/v1'); 
var bcrypt = require('bcrypt');

const userPuppeteer = function (entities) {
    const userRepository = repositories.userRepository(entities);

    const getAllUsers = function (req, res, next) {  
        userRepository.getAllUsers(function (err, users) {
            if (err) {
                next(err);
            } else {
                let response = {
                    result: true,
                    data: users,
                    error: null
                };
                res.status(200).json(response);
            }
        });
    };

    const addUser = function (req, res, next) {  
        var query = getUserFromQuery(req);
        userRepository.addUser(query, function (err, users) {
            if (err) {
                next(err);
            } else {
                let response = {
                    result: true,
                    data: users,
                    error: null
                };
                res.status(200).json(response);
            }
        });
    };

    const updateUser = function (req, res, next) {  
        var query = getUserFromQuery(req);
        userRepository.updateUser(query, function (err, users) {
            if (err) {
                next(err);
            } else {
                let response = {
                    result: true,
                    data: users,
                    error: null
                };
                res.status(200).json(response);
            }
        });
    };

    const findUser = function (req, res, next) {
        userRepository.findUser(req.params.id, function (err, user) {
            if (err) {
                next(err);
            } else {
                let response = {
                    result: true,
                    data: user,
                    error: null
                };
                res.status(200).json(response);
            }
        });
    };

    const authenticateUser = function (email, password, callback) {
        userRepository.findUser( email, function (err, found) {
            if (err) {
                return callback(err, null);
            }
            if (!found) {
                return callback(null, null);
            }
            if (found) {
                bcrypt.compare(password, found.password, function (err, isMatch) {
                    if (err) return callback(err);
                    if (isMatch) {
                        return callback(err, found);
                    }
                    return callback(null, null);
                });
            }
        });
    }

    var getUserFromQuery = function(req)
    {
        var query = {};
        if (req.body.organizationId) {
            query.organizationId = req.body.organizationId;
        }
        if (req.body.companyId) {
            query.companyId = req.body.companyId;
        }
        if (req.body._id) {
            query._id = req.body._id;
        }
        if (req.body.firstName) {
            query.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            query.lastName = req.body.lastName;
        }
        if (req.body.email) {
            query.email = req.body.email;
        }
        if (req.body.password) {
            query.password = req.body.password;
        }
        return query;
    }

    return {
        getAllUsers: getAllUsers,
        findUser: findUser,
        addUser: addUser,
        updateUser: updateUser,
        authenticateUser : authenticateUser
    };
};

module.exports = userPuppeteer;
