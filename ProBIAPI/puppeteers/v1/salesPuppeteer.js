const repositories = require(__dirname + '/../../repositories/v1');
const models = require(__dirname + '/../../models/v1');

//var xml2js = require('xml2js');
var fs = require('fs');
var xmlParser = require('xml2js').parseString;

const salesPuppeteer = function (entities) {
    const salesRepository = repositories.salesRepository(entities);

    const newSales = function (req, res, next) {
        fs.readFile(req.file.path, function (err, data) {
            xmlParser(data, function (err, result) {
                if (err) {
                    next(err)
                } else {
                    salesRepository.addSales(result, function (err, voucher) {
                        if (err) {
                            next(err);
                        } else {
                            let response = {
                                result: true,
                                data: voucher,
                                message: "Successfully Added."
                            };
                            res.status(200).json(response);
                        }
                    });
                }
            });
        });
    };

    const getAllSales = function (req, res, next) {
        salesRepository.getAllSales(function (err, vouchers) {
            //salesRepository.addSales(function (err, vouchers) {
            if (err) {
                // error handlers will take care of it
                next(err);
            } else {
                let response = {
                    success: true,
                    data: vouchers,
                    message: null
                };
                res.status(200).json(response);
            }
        });
    };

    const getXML = function (req, res, next) {
        var d = hello();
        salesRepository.getAllSales(function (err, vouchers) {
            //salesRepository.addSales(function (err, vouchers) {
            if (err) {
                // error handlers will take care of it
                next(err);
            } else {
                let response = {
                    success: true,
                    data: vouchers,
                    message: null
                };
                res.status(200).json(response);
            }
        });
    };

    function hello() {
        var xmlfile = "F:\Projects\probi\ProBIAPI\routes\v1\SalesVoucherWithoutMasters.xml";

        var parser = require('xml2json');
        var fs = require('fs');
        fs.readFile("routes\\v1\\SalesVoucherWithoutMasters.xml", function (err, data) {
            console.log(data);

            var json = parser.toJson(data);
            console.log(json);
        });
        //console.log(data);
    }

    const getSalesByID = function (req, res, next) {
        // console.log("SalesPup: ", req.params.id);
        salesRepository.getSalesByID(req.params.id, function (err, result) {
            if (err) {
                next(err)
            } else {
                let response = {
                    result: true,
                    data: result,
                    message: null
                };
                res.status(200).json(response);
            }
        })
    }

    const getSalesByFilters = function (req, res, next) {
        salesRepository.getSalesByFilters(req.body, function (err, result) {
            if (err) {
                next(err)
            } else {
                let response = {
                    result: true,
                    data: result,
                    message: null
                };
                res.status(200).json(response);
            }
        })
    }

    const deleteSalesByID = function (req, res, next) {
        salesRepository.deleteSalesByID(req.params.id, function (err) {
            if (err) {
                next(err)
            } else {
                let response = {
                    result: true,
                    message: "Successfully Deleted."
                };
                res.status(200).json(response);
            }
        })
    }

    const updateSalesByID = function (req, res, next) {
        fs.readFile(req.file.path, function (err, data) {
            if (err) {
                next(err)
            } else {
                xmlParser(data, function (err, result) {
                    if (err) {
                        next(err)
                    } else {
                        salesRepository.updateSalesByID(req.params.id, result, function (err, result) {
                            if (err) {
                                next(err)
                            } else {
                                let response = {
                                    result: true,
                                    data: result,
                                    message: "Successfully Updated."
                                };
                                res.status(200).json(response);
                            }
                        })
                    }
                });
            }
        });
    }

    const getTotalSales = function (req, res, next) {
        salesRepository.getTotalSales(req.params.companyId, req.params.fromDate, req.params.toDate, function (err, results) {
            if (err) {
                next(err);
            } else {

                let response = {
                    result: true,
                    data: {totalSales: results ? results.totalSales : 0},
                    message: null
                };
                res.status(200).json(response);
            }
        });
    }

    const getProductsGroupedByCustomer = function(req, res, next){
        salesRepository.getProductsGroupedByCustomer(req.params.companyId, req.params.fromDate, req.params.toDate, req.params.productName, function(err, result){
            if(err){
                next(err);
            } else{
                let response = {
                    result: true,
                    data: {
                        companyId: req.params.companyId,
                        fromDate: req.params.fromDate,
                        toDate: req.params.toDate,
                        productName: req.params.productName,
                        customers: result
                    },
                    message: null
                }
                res.status(200).json(response);
            }
        });
    }

    const getProductsGroupedByPeriod = function(req, res, next){
        salesRepository.getProductsGroupedByPeriod(req.params.companyId, req.params.fromDate, req.params.toDate, req.params.productName, function(err, result){
            if(err){
                next(err);
            } else{
                let response = {
                    result: true,
                    data: {
                        companyId: req.params.companyId,
                        fromDate: req.params.fromDate,
                        toDate: req.params.toDate,
                        productName: req.params.productName,
                        periods: result
                    },
                    message: null
                }
                res.status(200).json(response);
            }
        });
    }

    const getProductsGroupedByRegion = function(req, res, next){
        salesRepository.getProductsGroupedByRegion(req.params.companyId, req.params.fromDate, req.params.toDate, req.params.productName, function(err, result){
            if(err){
                next(err);
            } else{
                let response = {
                    result: true,
                    data: {
                        companyId: req.params.companyId,
                        fromDate: req.params.fromDate,
                        toDate: req.params.toDate,
                        productName: req.params.productName,
                        regions: result
                    },
                    message: null
                }
                res.status(200).json(response);
            }
        });
    }

    const getCustomersGroupedByProduct = function (req, res, next) {
        salesRepository.getCustomersGroupedByProduct(req.params.companyId, req.params.fromDate, req.params.toDate, req.params.buyerName, function (err, result) {
            if (err) {
                next(err);
            } else {
                models.response = {};
                models.response.result = true,
                    models.response.data = {
                        companyId: req.params.companyId,
                        fromDate: req.params.fromDate,
                        toDate: req.params.toDate,
                        buyerName: req.params.buyerName,
                        products: result
                    }
                models.response.error = null
                res.status(200).json(models.response);
            }
        });
    }

    const getCustomersGroupedByPeriod = function (req, res, next) {
        salesRepository.getCustomersGroupedByPeriod(req.params.companyId, req.params.fromDate, req.params.toDate, req.params.buyerName, function (err, result) {
            if (err) {
                next(err);
            } else {
                models.response = {};
                models.response.result = true,
                    models.response.data = {
                        companyId: req.params.companyId,
                        fromDate: req.params.fromDate,
                        toDate: req.params.toDate,
                        buyerName: req.params.buyerName,
                        periods: result
                    }
                models.response.error = null
                res.status(200).json(models.response);
            }
        });
    }

    const getCustomersGroupedByRegion = function (req, res, next) {
        salesRepository.getCustomersGroupedByRegion(req.params.companyId, req.params.fromDate, req.params.toDate, req.params.buyerName, function (err, result) {
            if (err) {
                next(err);
            } else {
                models.response = {};
                models.response.result = true,
                    models.response.data = {
                        companyId: req.params.companyId,
                        fromDate: req.params.fromDate,
                        toDate: req.params.toDate,
                        buyerName: req.params.buyerName,
                        regions: result
                    }
                models.response.error = null
                res.status(200).json(models.response);
            }
        });
    }

    function periodGenerator(month) {
        var date = new Date(month), y = date.getFullYear(), m = date.getMonth();
        days = {
            firstDay: new Date(y, m, 1),
            lastDay: new Date(y, m + 1, 1)
        }
        return days;
    }
    const getPeriodsGroupedByCustomer = function (req, res, next) {
        var days = periodGenerator(req.params.month);
        salesRepository.getPeriodsGroupedByCustomer(req.params.companyId, days.firstDay, days.lastDay, function (err, result) {
            if (err) {
                next(err);
            } else {
                models.response = {};
                models.response.result = true,
                    models.response.data = {
                        companyId: req.params.companyId,
                        period: req.params.month,
                        customers: result
                    }
                models.response.error = null
                res.status(200).json(models.response);
            }
        });
    }

    const getPeriodsGroupedByProduct = function (req, res, next) {
        var days = periodGenerator(req.params.month);
        salesRepository.getPeriodsGroupedByProduct(req.params.companyId, days.firstDay, days.lastDay, function (err, result) {
            if (err) {
                next(err);
            } else {
                models.response = {};
                models.response.result = true,
                    models.response.data = {
                        companyId: req.params.companyId,
                        period: req.params.month,
                        products: result
                    }
                models.response.error = null
                res.status(200).json(models.response);
            }
        });
    }

    const getPeriodsGroupedByRegion = function (req, res, next) {
        var days = periodGenerator(req.params.month);
        salesRepository.getPeriodsGroupedByRegion(req.params.companyId, days.firstDay, days.lastDay, function (err, result) {
            if (err) {
                next(err);
            } else {
                models.response = {};
                models.response.result = true,
                    models.response.data = {
                        companyId: req.params.companyId,
                        period: req.params.month,
                        regions: result
                    }
                models.response.error = null
                res.status(200).json(models.response);
            }
        });
    }

    const getRegionsGroupedByCustomer = function (req, res, next) {
        salesRepository.getRegionsGroupedByCustomer(req.params.companyId, req.params.fromDate, req.params.toDate, req.params.stateName, function (err, result) {
            if (err) {
                next(err);
            } else {
                models.response = {};
                models.response.result = true,
                    models.response.data = {
                        companyId: req.params.companyId,
                        fromDate: req.params.fromDate,
                        toDate: req.params.toDate,
                        stateName: req.params.stateName,
                        customers: result
                    }
                models.response.error = null
                res.status(200).json(models.response);
            }
        });
    }

    const getRegionsGroupedByProducts = function (req, res, next) {
        salesRepository.getRegionsGroupedByProducts(req.params.companyId, req.params.fromDate, req.params.toDate, req.params.stateName, function (err, result) {
            if (err) {
                next(err);
            } else {
                models.response = {};
                models.response.result = true,
                    models.response.data = {
                        companyId: req.params.companyId,
                        fromDate: req.params.fromDate,
                        toDate: req.params.toDate,
                        stateName: req.params.stateName,
                        products: result
                    }
                models.response.error = null
                res.status(200).json(models.response);
            }
        });
    }

    const getRegionsGroupedByPeriod = function (req, res, next) {
        salesRepository.getRegionsGroupedByPeriod(req.params.companyId, req.params.fromDate, req.params.toDate, req.params.stateName, function (err, result) {
            if (err) {
                next(err);
            } else {
                models.response = {};
                models.response.result = true,
                    models.response.data = {
                        companyId: req.params.companyId,
                        fromDate: req.params.fromDate,
                        toDate: req.params.toDate,
                        statetName: req.params.stateName,
                        periods: result
                    }
                models.response.error = null
                res.status(200).json(models.response);
            }
        });
    }

    const customers = function (req, res, next) {
        salesRepository.getSalesGroupedByCustomer(req.params.companyId, req.params.fromDate, req.params.toDate, function (err, results) {
            if (err) {
                next(err);
            } else {
                let response = {
                    result: true,
                    data: {
                        companyId: req.params.companyId,
                        fromDate: req.params.fromDate,
                        toDate: req.params.toDate,
                        customers: results
                    },
                    message: null
                };
                res.status(200).json(response);
            }
        });
    }

    const products = function (req, res, next) {
        salesRepository.getSalesGroupedByProduct(req.params.companyId, req.params.fromDate, req.params.toDate, function (err, results) {
            if (err) {
                next(err);
            } else {
                let response = {
                    result: true,
                    data: {
                        companyId: req.params.companyId,
                        fromDate: req.params.fromDate,
                        toDate: req.params.toDate,
                        products: results
                    },
                    message: null
                };
                res.status(200).json(response);
            }
        });
    }

    const period = function (req, res, next) {
        salesRepository.getSalesGroupedByMonth(req.params.companyId, req.params.fromDate, req.params.toDate, function (err, results) {
            if (err) {
                next(err);
            } else {
                let response = {
                    result: true,
                    data: {
                        companyId: req.params.companyId,
                        fromDate: req.params.fromDate,
                        toDate: req.params.toDate,
                        periods: results
                    },
                    message: null
                };
                res.status(200).json(response);
            }
        });
    }

    const regions = function (req, res, next) {
        salesRepository.getSalesGroupedByState(req.params.companyId, req.params.fromDate, req.params.toDate, function (err, results) {
            if (err) {
                next(err);
            } else {
                let response = {
                    result: true,
                    data: {
                        companyId: req.params.companyId,
                        fromDate: req.params.fromDate,
                        toDate: req.params.toDate,
                        regions: results
                    },
                    message: null
                };
                res.status(200).json(response);
            }
        });
    }

    

    return {
        newSales: newSales,
        getSalesByID: getSalesByID,
        getSalesByFilters: getSalesByFilters,
        deleteSalesByID: deleteSalesByID,
        updateSalesByID: updateSalesByID,
        getAllSales: getAllSales,
        getXML: getXML,
        getTotalSales: getTotalSales,
        getProductsGroupedByCustomer: getProductsGroupedByCustomer,
        getProductsGroupedByPeriod: getProductsGroupedByPeriod,
        getProductsGroupedByRegion: getProductsGroupedByRegion,
        getCustomersGroupedByProduct: getCustomersGroupedByProduct,
        getCustomersGroupedByPeriod: getCustomersGroupedByPeriod,
        getCustomersGroupedByRegion: getCustomersGroupedByRegion,
        getPeriodsGroupedByCustomer: getPeriodsGroupedByCustomer,
        getPeriodsGroupedByProduct: getPeriodsGroupedByProduct,
        getPeriodsGroupedByRegion: getPeriodsGroupedByRegion,
        getRegionsGroupedByCustomer: getRegionsGroupedByCustomer,
        getRegionsGroupedByProducts: getRegionsGroupedByProducts,
        getRegionsGroupedByPeriod: getRegionsGroupedByPeriod,
        customers: customers,
        products: products,
        period: period,
        regions: regions
    };
};


module.exports = salesPuppeteer;
