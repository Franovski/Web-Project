const Transaction = require('../models/transactionModel');
const transactionService = require('../services/transactionService.js');

class TransactionController{

    static async create(req,res){
        try{
            const {status, transactionDate, amount, currency, paymentMethod, refundReason, ticketId, userId} = req.body;
            var transaction = new Transaction(0, status, transactionDate, amount, currency, paymentMethod,
                refundReason, ticketId, userId);
            const result = await transactionService.create(transaction);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in TransactionController.create: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async update(req,res){
        try{
            const {status, transactionDate, amount, currency, paymentMethod, refundReason, ticketId, userId} = req.body;
            const {id} = req.params;
            var transaction = new Transaction(id, status, transactionDate, amount, currency, paymentMethod,
                refundReason, ticketId, userId);
            const result = await transactionService.update(transaction);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in TransactionController.update: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async delete(req,res){
        try{
            const {id} = req.params;
            const result = await transactionService.delete(id);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in TransactionController.delete: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readAll(req,res){
        try{
            const result = await transactionService.readAll();
            res.status(200).json(result);
        }catch(err){
            console.error("Error in TransactionController.readAll: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readTransactionById(req,res){
        try{
            const {id} = req.params;
            const result = await transactionService.readTransactionById(id);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in TransactionController.readTransactionById: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readTransactionByStatus(req,res){
        try{
            const {status} = req.params;
            const result = await transactionService.readTransactionByStatus(status);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in TransactionController.readTransactionByStatus: " , err.message);
            res.status(500).json(err.message);
        }
    }
}

module.exports = TransactionController;