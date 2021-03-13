const express = require('express');
const {
  getCustomersList,
  createCustomer,
  updateCustomer,
  removeCustomer,
  getCustomer,
} = require('../controllers/customers');

const router = express.Router();

router.get('/', getCustomersList);

router.post('/', createCustomer);

router.put('/:id', updateCustomer);

router.delete('/:id', removeCustomer);

router.get('/:id', getCustomer);

module.exports = router;
