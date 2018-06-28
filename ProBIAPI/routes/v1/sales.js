var express = require('express');
var router = express.Router();
var path = require('path');
var parser = require('xml2json');
var bodyParser = require('body-parser');
var restrict = require('../../auth/restrict');
var multer = require('multer');
var upload = multer({dest: '/uploads/'});

var jsonPath = path.join(__dirname, '..','..');

const entities = require(jsonPath + '/entities/v1');
const puppeteers = require(jsonPath + '/puppeteers/v1');

const salesPuppeteer = puppeteers.salesPuppeteer(entities);

router.route('/').get(salesPuppeteer.getAllSales);
router.route('/xml').get(salesPuppeteer.getXML);

router.use('/salesEntity', restrict);
router.post('/salesEntity', upload.single('salesEntity'), salesPuppeteer.newSales);
router.route('/salesEntity').get(salesPuppeteer.getAllSales);

router.use('/salesEntity/:id', restrict);
router.route('/salesEntity/:id').get(salesPuppeteer.getSalesByID);
router.post('/salesEntity/params', salesPuppeteer.getSalesByFilters);
router.delete('/salesEntity/:id', salesPuppeteer.deleteSalesByID);
router.put('/salesEntity/:id',upload.single('salesEntity'), salesPuppeteer.updateSalesByID);

router.use('/getTotalSales/:companyId/:fromDate/:toDate', restrict);
router.route('/getTotalSales/:companyId/:fromDate/:toDate').get(salesPuppeteer.getTotalSales);

router.use('/customers/:companyId/:fromDate/:toDate', restrict);
router.route('/customers/:companyId/:fromDate/:toDate').get(salesPuppeteer.customers);

router.use('/products/:companyId/:fromDate/:toDate', restrict);
router.route('/products/:companyId/:fromDate/:toDate').get(salesPuppeteer.products);

router.use('/period/:companyId/:fromDate/:toDate', restrict);
router.route('/period/:companyId/:fromDate/:toDate').get(salesPuppeteer.period);

router.use('/regions/:companyId/:fromDate/:toDate', restrict);
router.route('/regions/:companyId/:fromDate/:toDate').get(salesPuppeteer.regions);

router.use('/products/customers/:companyId/:fromDate/:toDate/:productName', restrict);
router.route('/products/customers/:companyId/:fromDate/:toDate/:productName').get(salesPuppeteer.getProductsGroupedByCustomer);

router.use('/products/period/:companyId/:fromDate/:toDate/:productName', restrict);
router.route('/products/period/:companyId/:fromDate/:toDate/:productName').get(salesPuppeteer.getProductsGroupedByPeriod);

router.use('/products/region/:companyId/:fromDate/:toDate/:productName', restrict);
router.route('/products/region/:companyId/:fromDate/:toDate/:productName').get(salesPuppeteer.getProductsGroupedByRegion);

router.use('/customers/products/:companyId/:fromDate/:toDate/:buyerName' , restrict);
router.route('/customers/products/:companyId/:fromDate/:toDate/:buyerName').get(salesPuppeteer.getCustomersGroupedByProduct);

router.use('/customers/periods/:companyId/:fromDate/:toDate/:buyerName' , restrict);
router.route('/customers/periods/:companyId/:fromDate/:toDate/:buyerName').get(salesPuppeteer.getCustomersGroupedByPeriod);

router.use('/customers/regions/:companyId/:fromDate/:toDate/:buyerName' , restrict);
router.route('/customers/regions/:companyId/:fromDate/:toDate/:buyerName').get(salesPuppeteer.getCustomersGroupedByRegion);

router.use('/periods/customers/:companyId/:month' , restrict);
router.route('/periods/customers/:companyId/:month').get(salesPuppeteer.getPeriodsGroupedByCustomer);

router.use('/periods/products/:companyId/:month' , restrict);
router.route('/periods/products/:companyId/:month').get(salesPuppeteer.getPeriodsGroupedByProduct);

router.use('/periods/regions/:companyId/:month' , restrict);
router.route('/periods/regions/:companyId/:month').get(salesPuppeteer.getPeriodsGroupedByRegion);

router.use('/regions/customers/:companyId/:fromDate/:toDate/:stateName' , restrict);
router.route('/regions/customers/:companyId/:fromDate/:toDate/:stateName').get(salesPuppeteer.getRegionsGroupedByCustomer);

router.use('/regions/products/:companyId/:fromDate/:toDate/:stateName' , restrict);
router.route('/regions/products/:companyId/:fromDate/:toDate/:stateName').get(salesPuppeteer.getRegionsGroupedByProducts);

router.use('/regions/period/:companyId/:fromDate/:toDate/:stateName' , restrict);
router.route('/regions/period/:companyId/:fromDate/:toDate/:stateName').get(salesPuppeteer.getRegionsGroupedByPeriod);


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;