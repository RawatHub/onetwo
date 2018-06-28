var express = require('express');
var router = express.Router();
var path = require('path');
var restrict = require('../../auth/restrict');

var jsonPath = path.join(__dirname, '..','..');

const entities = require(jsonPath + '/entities/v1');
const puppeteers = require(jsonPath + '/puppeteers/v1');

const dashboardPuppeteer = puppeteers.dashboardPuppeteer(entities);

router.use('/getData/:companyId/:fromDate/:toDate', restrict);
router.route('/getData/:companyId/:fromDate/:toDate').get(dashboardPuppeteer.getDashboardData);

module.exports = router;
