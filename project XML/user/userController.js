var express = require('express');
//var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./user');
var SalesEntity = require('./salesEntity');
var fs = require('fs');
var parseXML = require('xml2js').parseString;
var xml = require('express-xml-bodyparser');
// app.use(xml());

var dataObj;
fs.readFile('../sth.xml', function (err, data) {
    parseXML(data, function (err, result) {
        //var obj1 = result.BODY.IMPORTDATA[0].REQUESTDATA[0].TALLYMESSAGE[0];
        //var obj2 = result.BODY.IMPORTDATA[0].REQUESTDATA[0].TALLYMESSAGE[1];
        // console.log("asd: ", JSON.stringify(result));
        //console.log(obj1.VOUCHER[0].BASICBUYERNAME[0]);
    });
});

// Insert new User
router.post('/', xml({ trim: false, explicitArray: false }), function (req, res, next) {

    var obj1 = req.body.body.importdata.requestdata.tallymessage[0].voucher;
    var obj2 = req.body.body.importdata.requestdata.tallymessage[1];

    SalesEntity.create({
        companyId: obj2.company.remotecmpinfo_list.name,
        voucherType: obj1.vouchertypename,
        voucherNumber: obj1.vouchernumber,
        voucherDate: obj1.date,
        deliverAt: obj1.palceofsupply,
        truckNumber: obj1.basicshippedby,
        buyerDetails: {
            buyerName: obj1.basicbuyername,
            buyerAddress: obj1.basicbuyeraddress_list.basicbuyeraddress,
            buyerState: obj1.placeofsupply,
            buyerPinCode: null,
            buyerPhone: null,
            buyerMobile: null
        },
        inventoryEntries: [{
            productName: obj1.allinventoryentries_list[0].stockitemname,
            quantity: obj1.allinventoryentries_list[0].actualqty,
            unit: null,
            rate: obj1.allinventoryentries_list[0].rate,
            discount: obj1.allinventoryentries_list[0].discount,
            amount: obj1.allinventoryentries_list[0].amount
        },
        {
            productName: obj1.allinventoryentries_list[1].stockitemname,
            quantity: obj1.allinventoryentries_list[1].actualqty,
            unit: null,
            rate: obj1.allinventoryentries_list[1].rate,
            discount: obj1.allinventoryentries_list[1].discount,
            amount: obj1.allinventoryentries_list[1].amount
        }],
        ledgerEntries: [{
            ledgerName: obj1.ledgerentries_list[0].ledgername,
            isPartyLedger: obj1.ledgerentries_list[0].ispartyledger == "Yes" ? true : false,
            amount: obj1.ledgerentries_list[0].amount
        },{
            ledgerName: obj1.ledgerentries_list[1].ledgername,
            isPartyLedger: obj1.ledgerentries_list[1].ispartyledger == "Yes" ? true : false,
            amount: obj1.ledgerentries_list[1].amount
        }]
    },
        function (err, user) {
            if (err) {
                console.log("Errors: ", err);
                return res.status(500).send("There was a problem adding the information to the database.");
            }
            console.log(user);
            res.status(200).send(user);
        });
});

// Return all Users
router.get('/', function (req, res) {

    SalesEntity.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the Data.");
        res.status(200).send(users);
    });
});

// Find user by ID
router.get('/:id', function (req, res) {

    SalesEntity.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// Delete user from db
router.delete('/:id', function (req, res) {

    SalesEntity.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the Data.");
        res.status(200).send("Data " + user.id + " was deleted.");
    });
});

// Update existing user
router.put('/:id', function (req, res) {

    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the Data.");
        res.status(200).send(user);
    });
});

module.exports = router;