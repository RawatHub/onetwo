var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./user');
var parseXML = require('xml2js').parseString;
var xmlMapping = require('xml-mapping')
var fs = require('fs')
var util = require('util')

var dataObj;

fs.readFile('../sth.xml', function (err, data) {
    // parseXML(data, function(err, result) {
    var json = xmlMapping.tojson('<pop>sdfghj</pop>');
    var xml = xmlMapping.dump(json);
    console.log("xml to js result: ", json);
    // })
});

router.post('/', function (req, res) {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});


router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// var xml = "<root>Hello!</root>";
// parseXML(xml, function(err, result){
//   console.log(result);
// }); 


router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});
module.exports = router;