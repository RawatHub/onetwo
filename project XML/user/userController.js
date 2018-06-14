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
//var xml = require('express-xml-bodyparser');
var multer = require('multer');
var upload = multer({ dest: '/uploads/' })

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
router.post('/', upload.single('salesEntity'), function (req, res) {

    //console.log(req.file);
    fs.readFile(req.file.path, function (err, data) {
        parseXML(data, function (err, result) {
            //console.log(result);
            var obj1 = result.BODY.IMPORTDATA[0].REQUESTDATA[0].TALLYMESSAGE[0].VOUCHER[0];
            var obj2 = result.BODY.IMPORTDATA[0].REQUESTDATA[0].TALLYMESSAGE[1].COMPANY[0].REMOTECMPINFO_LIST[0];
            //console.log(obj2,"---------------------------------------", "\n");
            
            //var obj1 = result.body.importdata.requestdata.tallymessage[0].voucher;
            //var obj2 = result.body.importdata.requestdata.tallymessage[1].company.remotecmpinfo_list;
            var i = 0, j = 0;
            var ie = [], le = [];

            while (!(obj1.ALLINVENTORYENTRIES_LIST[i] === undefined)) {
                ie.push({
                    productName: obj1.ALLINVENTORYENTRIES_LIST[i].STOCKITEMNAME[0],
                    quantity: obj1.ALLINVENTORYENTRIES_LIST[i].ACTUALQTY[0],
                    unit: null,
                    rate: obj1.ALLINVENTORYENTRIES_LIST[i].RATE[0],
                    discount: obj1.ALLINVENTORYENTRIES_LIST[i].DISCOUNT[0],
                    amount: obj1.ALLINVENTORYENTRIES_LIST[i].AMOUNT[0]
                });
                i++;
            }
            while (!(obj1.LEDGERENTRIES_LIST[j] === undefined)) {
                le.push({
                    ledgerName: obj1.LEDGERENTRIES_LIST[j].LEDGERNAME[0],
                    isPartyLedger: (obj1.LEDGERENTRIES_LIST[j].ISPARTYLEDGER[0] === 'No' ? false : true),
                    amount: obj1.LEDGERENTRIES_LIST[j].AMOUNT[0]
                });
                j++;
            }

            SalesEntity.create({
                companyId: obj2.NAME[0],
                voucherType: obj1.VOUCHERTYPENAME[0],
                voucherNumber: obj1.VOUCHERNUMBER[0],
                voucherDate: obj1.DATE[0],
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
            },
                function (err, entity) {
                    if (err) return res.status(500).send(err);
                    res.status(200).send(entity);
                });
        }); // parseXML
    }); // readFile
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