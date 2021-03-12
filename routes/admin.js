var express = require('express');
const { getAllTrackingOrders, getAdminDashboard } = require('../controllers/order');
const { getAllProductsAdminPage, getProductById } = require('../controllers/products');
var router = express.Router();

/* GET home page. */
router.get('/', getAdminDashboard);

router.get('/menu', getAllProductsAdminPage);

router.get('/menuform', function(req, res) {
  res.render('menuform', { title: 'Admin' });
});

router.get('/todayorder', function(req, res) {
  res.render('todayorder', { title: 'Admin' });
});

router.get('/trackorder', getAllTrackingOrders);

router.get('/searchorders', function(req, res) {
  res.render('searchorders', { title: 'Admin' });
});

module.exports = router;
