const repositories = require(__dirname + '/../../repositories/v1');
const models =  require(__dirname + '/../../models/v1');

const dashboardPuppeteer = function (entities) {
    var Dashboard = entities.dashboardEntity; 
    const salesRepository = repositories.salesRepository(entities);
    const dashboardRepository = repositories.dashboardRepository(entities);

    const getDashboardData = function (req, res, next) {
        var dashboardData = new Dashboard();

        salesRepository.getTotalSales(req.params.companyId, req.params.fromDate, req.params.toDate , function (err, result) {
            if (err) {
                next(err);
            } else {
                dashboardData.companyId = req.params.companyId;
                dashboardData.fromDate = req.params.fromDate;
                dashboardData.toDate = req.params.toDate;
                dashboardData.totals.sales = result? result.totalSales : 0;
                dashboardData.totals.purchase = result? result.totalSales * 0.75 : 0; //TODO: passing dummy value for now, will be getting that later from database
                dashboardData.totals.outstanding = result? result.totalSales * 0.50 : 0; //TODO: passing dummy value for now, will be getting that later from database
                dashboardData.totals.stockAtHand = result? result.totalSales * 0.25 : 0; //TODO: passing dummy value for now, will be getting that later from database
                delete dashboardData._id;

                let response = {
                    result: true,
                    data: dashboardData,
                    error: null
                };
                res.status(200).json(response);
            }
        });
    };
    
    return {
        getDashboardData: getDashboardData
    };
};


module.exports = dashboardPuppeteer;
