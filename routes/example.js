const express = require('express');

const router = express.Router();

const customerController = require('../controllers/customerController');

router.post('/create', customerController.createCustomer);
router.get('/customer/:id', customerController.getCustomer);
router.get('/customers', customerController.getCustomers);


module.exports = router;