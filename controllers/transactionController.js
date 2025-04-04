const Transaction = require('../models/transactionModel.js');
const transactionService = require('../services/transactionService.js');
const moment = require('moment');

class TransactionController {

    /**
     * @description Creates a new transaction.
     * @param {Request} req - The request object containing transaction data.
     * @param {Response} res - The response object to send the result.
     * @returns {void}
     */
    static async create(req, res) {
        try {
            const { status, amount, currency, paymentMethod, refundReason, ticketId, userId } = req.body;
            const transactionDate = moment().format('YYYY-MM-DD HH:mm:ss');
            var transaction = new Transaction(0, status, transactionDate, amount, currency, paymentMethod, refundReason, ticketId, userId);
            const result = await transactionService.create(transaction);
            res.status(200).json({message: "Transaction created successfully", result});
        } catch (err) {
            console.error("Error in TransactionController.create: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * @description Updates an existing transaction.
     * @param {Request} req - The request object containing updated transaction data.
     * @param {Response} res - The response object to send the result.
     * @returns {void}
     */
    static async update(req, res) {
        try {
            const { status, amount, currency, paymentMethod, refundReason, ticketId, userId } = req.body;
            const transactionDate = moment().format('YYYY-MM-DD HH:mm:ss');
            const { id } = req.params;
            var transaction = new Transaction(id, status, transactionDate, amount, currency, paymentMethod, refundReason, ticketId, userId);
            const result = await transactionService.update(transaction);
            res.status(200).json({message: "Transaction updated successfully", result});
        } catch (err) {
            console.error("Error in TransactionController.update: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * @description Deletes a transaction by its ID.
     * @param {Request} req - The request object containing the transaction ID.
     * @param {Response} res - The response object to send the result.
     * @returns {void}
     */
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await transactionService.delete(id);
            res.status(200).json({message: "Transaction deleted successfully", result});
        } catch (err) {
            console.error("Error in TransactionController.delete: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * @description Retrieves all transactions.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object to send the result.
     * @returns {void}
     */
    static async readAll(req, res) {
        try {
            const result = await transactionService.readAll();
            res.status(200).json({message: "Transactions retrieved successfully", result});
        } catch (err) {
            console.error("Error in TransactionController.readAll: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * @description Retrieves a specific transaction by its ID.
     * @param {Request} req - The request object containing the transaction ID.
     * @param {Response} res - The response object to send the result.
     * @returns {void}
     */
    static async readTransactionById(req, res) {
        try {
            const { id } = req.params;
            const result = await transactionService.readTransactionById(id);
            res.status(200).json({message: "Transaction retrieved successfully", result});
        } catch (err) {
            console.error("Error in TransactionController.readTransactionById: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * @description Retrieves transactions based on their status.
     * @param {Request} req - The request object containing the transaction status.
     * @param {Response} res - The response object to send the result.
     * @returns {void}
     */
    static async readTransactionByStatus(req, res) {
        try {
            const { status } = req.params;
            const result = await transactionService.readTransactionByStatus(status);
            res.status(200).json({message: "Transactions retrieved successfully", result});
        } catch (err) {
            console.error("Error in TransactionController.readTransactionByStatus: ", err.message);
            res.status(500).json(err.message);
        }
    }
}

module.exports = TransactionController;
