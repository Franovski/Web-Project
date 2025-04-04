const express = require('express');
const TransactionController = require('../controllers/transactionController');
const { validateTransactionById, validateTransactionByStatus, validateTransaction } = require('../validators/transaction.dto');
const router = express.Router();

router.get('/', TransactionController.readAll);
router.get('/:id', validateTransactionById, TransactionController.readTransactionById);
router.get('/status/:status', validateTransactionByStatus, TransactionController.readTransactionByStatus);
router.post('/', validateTransaction, TransactionController.create);
router.put('/:id', validateTransactionById, validateTransaction, TransactionController.update);
router.delete('/:id', validateTransactionById, TransactionController.delete);

module.exports = router;