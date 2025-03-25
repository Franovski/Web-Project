const db = require('../config/db');
const Transaction = require('../models/transactionModel');
const Utils = require('../Utils/utils');
class TransactionRepository{

    static async create(transaction){
        try{
            let sql = `INSERT INTO transaction
            (transaction_status, transaction_date, amount, currency, payment_method, refund_reason, ticket_id, user_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const transactionDateFormatted = await Utils.formatDateSQL(transaction.transactionDate);
            const {affectedRows, insertId} =
            await db.query(sql, [transaction.status, transactionDateFormatted, transaction.amount,
                transaction.currency,transaction.paymentMethod, transaction.refundReason, transaction.ticketId,
                transaction.userId]); 
            return {
                affectedRows, 
                //insertId
            }
        }catch(err){
            throw new Error(err);
        }
    }

    static async update(transaction){
        try{
            let sql = `UPDATE transaction
            SET transaction_status = ?, transaction_date = ?, amount = ?, currency = ?, payment_method = ?,
            refund_reason = ?, ticket_id = ?, user_id = ?
            WHERE transaction_id = ?`;
            const transactionDateFormatted = await Utils.formatDateSQL(transaction.transactionDate);
            const {affectedRows} =
            await db.query(sql, [transaction.status, transactionDateFormatted, transaction.amount,
                transaction.currency,transaction.paymentMethod, transaction.refundReason, transaction.ticketId,
                transaction.userId, transaction.id]);
            return {affectedRows};
        }catch(err){
            throw new Error(err);
        }
    }

    static async delete(id){
        try{
            let sql = `DELETE FROM transaction
            WHERE transaction_id = ?`;

            const {affectedRows} = await db.query(sql, [id]);
            return {affectedRows};
        }catch(err){
            throw new Error(err);
        }
    }

    static async readAll(){
        try{
            const rows = await db.query(`SELECT * FROM transaction`);
            return rows.map(Transaction.fromRow);
        }catch(err){
            throw new Error(err);
        }
    }

    static async readTransactionById(id){
        try{
            let sql = `SELECT * FROM transaction
            WHERE transaction_id = ?`;
            const rows = await db.query(sql, [id]);
            return Transaction.fromRow(rows[0]);
        }catch(err){
            throw new Error(err);
        }
    }

    static async readTransactionByStatus(status){
        try{
            let sql = `SELECT * FROM transaction
            WHERE transaction_status = ?`;
            const rows = await db.query(sql, [status]);
            return rows.map(row => Transaction.fromRow(row));
        }catch(err){
            throw new Error(err);
        }
    }

    static async isTransactionExistById(id){
        try{
            let sql = `SELECT * FROM transaction WHERE transaction_id = ?`;
            const rows = await db.query(sql, [id]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }

    static async isTransactionExistByStatus(status){
        try{
            let sql = `SELECT * FROM transaction WHERE transaction_status = ?`;
            const rows = await db.query(sql, [status]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports = TransactionRepository;