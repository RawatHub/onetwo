const mongoose = require('mongoose');

var parentRepository = function () {

    var validate = function (model, callback) {
        model.validate(function (err) {
            if (err) {
                var error = appError({
                    type: "Model.Validation",
                    errorCode: 400,
                    message: "Fail to validate",
                    originalStack: err
                });
                callback(error);
            } else {
                callback(false);
            }
        });
    };

    const getByID = function (model, id, callback) {
        // console.log("ParentRepo: ", id);
        model.findById(id, function (err, docs) {
            if (err) {
                let error = appError({
                    type: 'DB.Fetch',
                    errorCode: 422,
                    message: "Failed to fetch documents",
                    originalStack: err
                });
                callback(error);
            } else {
                callback(false, docs);
            }
        })
    }

    const getByParameters = function (model, params, callback) {
        model.find(params, function (err, docs) {
            if (err) {
                let error = appError({
                    type: 'DB.Fetch',
                    errorCode: 422,
                    message: "Failed to fetch documents",
                    originalStack: err
                });
                callback(error);
            } else {
                callback(false, docs);
            }
        });
    };

    const getAll = function (model, callback) {
        model.find(function (err, docs) {
            if (err) {
                let error = appError({
                    type: 'DB.Fetch',
                    errorCode: 422,
                    message: "Failed to fetch documents",
                    originalStack: err
                });
                callback(error);
            } else {
                callback(false, docs);
            }
        });
    };

    var add = function (model, callback) {
        model.save(function (err, result) {
            if (err) {
                var error = appError({
                    type: "DB.Insert",
                    errorCode: 422,
                    message: "Operation failed, DB insert",
                    originalStack: err
                });
                callback(error)
            } else {
                callback(false, result);
            }
        });
    };

    var remove = function (model, callback) {
        model.remove(function (err) {
            if (err) {
                var error = appError({
                    type: "DB.Delete",
                    errorCode: 422,
                    message: "Operation failed, DB delete",
                    originalStack: err
                });
                callback(error)
            } else {
                callback(false);
            }
        });
    };

    var update = function (model, callback) {
        model.save(function (err) {
            if (err) {
                var error = appError({
                    type: "DB.Insert",
                    errorCode: 422,
                    message: "Operation failed, DB update",
                    originalStack: err
                });
                callback(error)
            } else {
                callback(false);
            }
        });
    };

    return {
        validate: validate,
        getAll: getAll,
        getByID: getByID,
        getByParameters: getByParameters,
        add: add,
        remove: remove,
        update: update
    };
};

module.exports = parentRepository;