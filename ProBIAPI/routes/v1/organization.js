var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var restrict = require('../../auth/restrict');

var jsonPath = path.join(__dirname, '..','..');

const entities = require(jsonPath + '/entities/v1');
const puppeteers = require(jsonPath + '/puppeteers/v1');

const organizationPuppeteer = puppeteers.organizationPuppeteer(entities);

router.post('/add', organizationPuppeteer.newOrganization);

router.get('/get', organizationPuppeteer.getAllOrganizations);

router.get('/get/:id', organizationPuppeteer.getOrganizationByID);

router.delete('/delete/:id', organizationPuppeteer.deleteOrganizationByID);

router.put('/update/:id', organizationPuppeteer.updateOrganizationByID)

module.exports = router;