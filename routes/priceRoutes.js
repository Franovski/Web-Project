const express = require('express');
const PriceController = require('../controllers/priceController');
const { validatePriceById, validatePrice } = require('../validators/price.dto');
const router = express.Router();

router.get('/', PriceController.readAll);
router.get('/:id', validatePriceById, PriceController.readPriceById);
router.post('/', validatePrice, PriceController.create);
router.put('/:id', validatePriceById, validatePrice, PriceController.update);
router.delete('/:id', validatePriceById, PriceController.delete);

module.exports = router;