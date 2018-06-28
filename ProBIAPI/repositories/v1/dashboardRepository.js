var parentRepository = require('./parentRepository')();

var dashboardRepository = function (entities) {
    var Dashboard = entities.dashboardEntity;

    //TODO: can be removed, Not in use as of now, not storing dashboard data into database
    const getAllData = function (callback) {
        parentRepository.getAll(Dashboard, function (err, dashboard) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, dashboard);
            }
        });
    };

    return {
        getAllData: getAllData
    }
};

module.exports = dashboardRepository;