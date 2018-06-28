var parentRepository = require('./parentRepository')();

var salesRepository = function (entities) {
    var Sales = entities.salesEntity;

    const getAllSales = function (callback) {
        parentRepository.getAll(Sales, function (err, vouchers) {
            if (err) {
                err.message = err.message.replace(/document/g, 'SalesVoucher');
                callback(err);
            } else {
                callback(false, vouchers);
            }
        });
    };

    function salesObjectGenerator(sales) {
        var obj1 = sales.BODY.IMPORTDATA[0].REQUESTDATA[0].TALLYMESSAGE[0].VOUCHER[0];
        var obj2 = sales.BODY.IMPORTDATA[0].REQUESTDATA[0].TALLYMESSAGE[1].COMPANY[0].REMOTECMPINFO_LIST[0];

        var i = 0, j = 0;
        var ie = [], le = [];

        while (!(obj1.ALLINVENTORYENTRIES_LIST[i] === undefined)) {
            ie.push({
                productName: obj1.ALLINVENTORYENTRIES_LIST[i].STOCKITEMNAME[0],
                quantity: obj1.ALLINVENTORYENTRIES_LIST[i].ACTUALQTY[0].split(' ')[1],
                unit: null,
                rate: obj1.ALLINVENTORYENTRIES_LIST[i].RATE[0].split('/')[0],
                discount: obj1.ALLINVENTORYENTRIES_LIST[i].DISCOUNT[0],
                amount: obj1.ALLINVENTORYENTRIES_LIST[i].AMOUNT[0]
            });
            i++;
        }
        while (!(obj1.LEDGERENTRIES_LIST[j] === undefined)) {
            le.push({
                ledgerName: obj1.LEDGERENTRIES_LIST[j].LEDGERNAME[0],
                isPartyLedger: (obj1.LEDGERENTRIES_LIST[j].ISPARTYLEDGER[0] !== 'No'),
                amount: obj1.LEDGERENTRIES_LIST[j].AMOUNT[0]
            });
            j++;
        }

        salesObject = {
            companyId: obj2.NAME[0],
            voucherType: obj1.VOUCHERTYPENAME[0],
            voucherNumber: obj1.VOUCHERNUMBER[0],
            voucherDate: (new Date(((obj1.DATE[0].slice(0, 4)) + "-" + (obj1.DATE[0].slice(4, 6) + "-" + (obj1.DATE[0].slice(6, 8)))))),
            deliverAt: obj1.PLACEOFSUPPLY[0],
            truckNumber: obj1.BASICSHIPPEDBY[0],
            buyerDetails: {
                buyerName: obj1.BASICBUYERNAME[0],
                buyerAddress: obj1.BASICBUYERADDRESS_LIST[0].BASICBUYERADDRESS,
                buyerState: obj1.STATENAME[0],
                buyerPinCode: null,
                buyerPhone: null,
                buyerMobile: null
            },
            inventoryEntries: ie,
            ledgerEntries: le
        }
        return salesObject;
    }

    const addSales = function (sales, callback) {
        newSales = new Sales(salesObjectGenerator(sales));
        parentRepository.add(newSales, function (err, voucher) {
            if (err) {
                err.message = err.message.replace(/document/g, 'SalesVoucher');
                callback(err);
            } else {
                callback(false, voucher);
            }
        });
    };

    var getSalesByID = function (id, callback) {
        parentRepository.getByID(Sales, id, function (err, voucher) {
            if (err) {
                err.message = err.message.replace(/document/g, 'SalesVoucher');
                callback(err);
            } else {
                callback(false, voucher);
            }
        });
    }

    var getSalesByFilters = function (params, callback) {

        var key = Object.keys(params)[0];
        // console.log(Object.keys(params)[0]);
        if (key) {
            var str;
            if (key.includes('buyer')) {
                str = "buyerDetails." + key
            }

            if (key.includes('product')) {
                str = "inventoryEntries." + key
            }

            if (key.includes('ledger')) {
                str = "ledgerEntries." + key
            }
            
            if(str){
                delete Object.assign(params, { [str]: params[key] })[key];
            }
        }

        if (key.includes('Date')) {
            var date = new Date(Object.values(params)[0]).toISOString();
            params = {
                "voucherDate": date
            }
        }
        console.log(params);
        parentRepository.getByParameters(Sales, params, function (err, voucher) {
            if (err) {
                err.message = err.message.replace(/document/g, 'SalesVoucher');
                callback(err);
            } else {
                callback(false, voucher);
            }
        });
    }

    var deleteSalesByID = function (id, callback) {
        getSalesByID(id, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                parentRepository.remove(result, function (err, voucher) {
                    if (err) {
                        err.message = err.message.replace(/document/g, 'SalesVoucher');
                        callback(err);
                    } else {
                        callback(false, voucher);
                    }
                });
            }
        })
    }

    var updateSalesByID = function (id, salesUpdate, callback) {
        var changes = salesObjectGenerator(salesUpdate);
        Sales.findOneAndUpdate({ _id: id }, changes, function (err, voucher) {
            if (err) {
                err.message = err.message.replace(/document/g, 'SalesVoucher');
                callback(err);
            } else {
                getSalesByID(id, function (err, voucher) {
                    if (err) {
                        console.log(err);
                    } else {
                        callback(false, voucher);
                    }
                })
            }
        })
    }

    var getTotalSales = function (companyId, fromDate, toDate, callback) {
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" }
                ]
            }
        };
        var s_unwind = { $unwind: '$ledgerEntries' };
        var s_group = { $group: { _id: null, "totalSales": { $sum: "$ledgerEntries.amount" } } };
        Sales.aggregate([s_match, s_unwind, s_group]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result[0]);
            }
        });
    };

    var getProductsGroupedByCustomer = function(companyId, fromDate, toDate, productName, callback){
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { 'inventoryEntries.productName' : productName},
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" }
                ]
            }
        };
        var s_unwind = { $unwind: '$inventoryEntries' };
        var s_group = { $group: { _id: { "customerName": "$buyerDetails.buyerName" }, "quantity": { $sum: "$inventoryEntries.quantity" } } };
        var s_project = { $project: { _id: 0, customerName: '$_id.customerName', quantity: '$quantity' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    }

    var getProductsGroupedByPeriod = function(companyId, fromDate, toDate, productName, callback){
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { 'inventoryEntries.productName' : productName},
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" }
                ]
            }
        };
        var s_unwind = { $unwind: '$inventoryEntries' };
        var s_group = { $group: { _id: { month: {'$month': '$voucherDate'} }, "quantity": { $sum: "$inventoryEntries.quantity" } } };
        var s_project = { $project: { _id: 0, month: '$_id.month', quantity: '$quantity' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    }

    var getProductsGroupedByRegion = function(companyId, fromDate, toDate, productName, callback){
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { 'inventoryEntries.productName' : productName},
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" }
                ]
            }
        };
        var s_unwind = { $unwind: '$inventoryEntries' };
        var s_group = { $group: { _id: { "region": "$buyerDetails.buyerState" }, "quantity": { $sum: "$inventoryEntries.quantity" } } };
        var s_project = { $project: { _id: 0, region: '$_id.region', quantity: '$quantity' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    }

    var getCustomersGroupedByProduct = function (companyId, fromDate, toDate, buyerName, callback) {
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" },
                    { "buyerDetails.buyerName": buyerName }
                ]
            }
        };
        var s_unwind = { $unwind: '$inventoryEntries' };
        var s_group = { $group: { _id: { "productName": "$inventoryEntries.productName" }, "totalQuantity": { $sum: "$inventoryEntries.quantity" } } };
        var s_project = { $project: { _id: 0, productName: '$_id.productName', quantity: '$totalQuantity' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    };

    var getCustomersGroupedByPeriod = function (companyId, fromDate, toDate, buyerName, callback) {
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" },
                    { "buyerDetails.buyerName": buyerName }
                ]
            }
        };
        var s_unwind = { $unwind: '$ledgerEntries' };
        var s_group = { $group: { _id: { "month": { $month: "$voucherDate" } }, "totalSales": { $sum: "$ledgerEntries.amount" } } };
        var s_project = { $project: { _id: 0, month: '$_id.month', sales: '$totalSales' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    };

    var getCustomersGroupedByRegion = function (companyId, fromDate, toDate, buyerName, callback) {
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" },
                    { "buyerDetails.buyerName": buyerName }
                ]
            }
        };
        var s_unwind = { $unwind: '$ledgerEntries' };
        var s_group = { $group: { _id: { "state": "$buyerDetails.buyerState" }, "totalSales": { $sum: "$ledgerEntries.amount" } } };
        var s_project = { $project: { _id: 0, state: '$_id.state', sales: '$totalSales' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    };

    var getPeriodsGroupedByCustomer = function (companyId, fromDate, toDate, callback) {
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" },
                ]
            }
        };
        var s_unwind = { $unwind: '$ledgerEntries' };
        var s_group = { $group: { _id: { "buyerName": "$buyerDetails.buyerName" }, "totalSales": { $sum: "$ledgerEntries.amount" } } };
        var s_project = { $project: { _id: 0, buyerName: '$_id.buyerName', sales: '$totalSales' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    };

    var getPeriodsGroupedByProduct = function (companyId, fromDate, toDate, callback) {
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" },
                ]
            }
        };
        var s_unwind = { $unwind: '$inventoryEntries' };
        var s_group = { $group: { _id: { "productName": "$inventoryEntries.productName" }, "totalQuantity": { $sum: "$inventoryEntries.quantity" } } };
        var s_project = { $project: { _id: 0, productName: '$_id.productName', quantity: '$totalQuantity' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    };

    var getPeriodsGroupedByRegion = function (companyId, fromDate, toDate, callback) {
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" }
                ]
            }
        };
        var s_unwind = { $unwind: '$ledgerEntries' };
        var s_group = { $group: { _id: { "state": "$buyerDetails.buyerState" }, "totalSales": { $sum: "$ledgerEntries.amount" } } };
        var s_project = { $project: { _id: 0, region: '$_id.state', sales: '$totalSales' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    };

    var getRegionsGroupedByCustomer = function (companyId, fromDate, toDate, stateName, callback) {
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" },
                    { "buyerDetails.buyerState": stateName}
                ]
            }
        };
        var s_unwind = { $unwind: '$ledgerEntries' };
        var s_group = { $group: { _id: { "buyerName": "$buyerDetails.buyerName" }, "totalSales": { $sum: "$ledgerEntries.amount" } } };
        var s_project = { $project: { _id: 0, buyerName: '$_id.buyerName', sales: '$totalSales' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    };

    var getRegionsGroupedByProducts = function (companyId, fromDate, toDate, stateName, callback) {
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" },
                    { "buyerDetails.buyerState": stateName }
                ]
            }
        };
        var s_unwind = { $unwind: '$inventoryEntries' };
        var s_group = { $group: { _id: { "productName": "$inventoryEntries.productName" }, "totalQuantity": { $sum: "$inventoryEntries.quantity" } } };
        var s_project = { $project: { _id: 0, productName: '$_id.productName', quantity: '$totalQuantity' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    };

    var getRegionsGroupedByPeriod = function (companyId, fromDate, toDate, stateName, callback) {
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" },
                    { "buyerDetails.buyerState": stateName }
                ]
            }
        };
        var s_unwind = { $unwind: '$ledgerEntries' };
        var s_group = { $group: { _id: { "month": { $month: "$voucherDate" } }, "totalSales": { $sum: "$ledgerEntries.amount" } } };
        var s_project = { $project: { _id: 0, month: '$_id.month', sales: '$totalSales' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    };


    var getSalesGroupedByCustomer = function (companyId, fromDate, toDate, callback) {
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" }
                ]
            }
        };
        var s_unwind = { $unwind: '$ledgerEntries' };
        var s_group = { $group: { _id: { "customerName": "$ledgerEntries.ledgerName" }, "totalSales": { $sum: "$ledgerEntries.amount" } } };
        var s_project = { $project: { _id: 0, customerName: '$_id.customerName', sales: '$totalSales' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    };

    var getSalesGroupedByProduct = function (companyId, fromDate, toDate, callback) {
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" }
                ]
            }
        };
        var s_unwind = { $unwind: '$inventoryEntries' };
        var s_group = { $group: { _id: { "productName": "$inventoryEntries.productName" }, "totalQuantity": { $sum: "$inventoryEntries.quantity" } } };
        var s_project = { $project: { _id: 0, productName: '$_id.productName', sales: '$totalQuantity' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    };

    var getSalesGroupedByMonth = function (companyId, fromDate, toDate, callback) {
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" }
                ]
            }
        };
        var s_unwind = { $unwind: '$ledgerEntries' };
        var s_group = { $group: { _id: { "month": { $month: "$voucherDate" } }, "totalSales": { $sum: "$ledgerEntries.amount" } } };
        var s_project = { $project: { _id: 0, month: '$_id.month', sales: '$totalSales' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    };

    var getSalesGroupedByState = function (companyId, fromDate, toDate, callback) {
        var s_match = {
            $match: {
                $and: [
                    { companyId: companyId },
                    { voucherDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                    { voucherType: "Sales" }
                ]
            }
        };
        var s_unwind = { $unwind: '$ledgerEntries' };
        var s_group = { $group: { _id: { "state": "$buyerDetails.buyerState" }, "totalSales": { $sum: "$ledgerEntries.amount" } } };
        var s_project = { $project: { _id: 0, state: '$_id.state', sales: '$totalSales' } };

        Sales.aggregate([s_match, s_unwind, s_group, s_project]).exec(function (err, result) {
            if (err) {
                err.message = err.message.replace(/document/g, 'user');
                callback(err);
            } else {
                callback(false, result);
            }
        });
    };

    return {
        getAllSales: getAllSales,
        addSales: addSales,
        getSalesByID: getSalesByID,
        getSalesByFilters: getSalesByFilters,
        deleteSalesByID: deleteSalesByID,
        updateSalesByID: updateSalesByID,
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
        getSalesGroupedByCustomer: getSalesGroupedByCustomer,
        getSalesGroupedByProduct: getSalesGroupedByProduct,
        getSalesGroupedByMonth: getSalesGroupedByMonth,
        getSalesGroupedByState: getSalesGroupedByState
    }
};

module.exports = salesRepository;