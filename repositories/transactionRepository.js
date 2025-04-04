const db = require('../config/db');
const Transaction = require('../models/transactionModel');
const Utils = require('../Utils/utils');
class TransactionRepository{

    static async create(transaction){

        /**
     * Creates a new transaction in the database.
     * @param {Transaction} transaction - Transaction data.
     * @returns {Transaction} affectedRows count.
     */

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

    /**
     * Updates an existing transaction in the database.
     * @param {Transaction} transaction - Transaction data with updated values.
     * @returns {Transaction} affectedRows count.
     */

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

    /**
     * Deletes a transaction by its ID.
     * @param {number} id - Transaction ID.
     * @returns {Transaction} affectedRows count.
     */

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

    /**
     * Reads all transactions from the database.
     * @returns {Array} List of all transactions.
     */

    static async readAll(){
        try{
            const rows = await db.query(`SELECT * FROM transaction`);
            return rows.map(Transaction.fromRow);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Reads a transaction by its ID.
     * @param {number} id - Transaction ID.
     * @returns {Transaction} Transaction object.
     */

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

    /**
     * Reads transactions by status.
     * @param {string} status - Transaction status.
     * @returns {Array} List of matching transactions.
     */

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

    /**
     * Checks if a transaction exists by ID.
     * @param {number} id - Transaction ID.
     * @returns {boolean} True if exists, false otherwise.
     */

    static async isTransactionExistById(id){
        try{
            let sql = `SELECT * FROM transaction WHERE transaction_id = ?`;
            const rows = await db.query(sql, [id]);
            return rows.length > 0;
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Checks if any transaction exists with the given status.
     * @param {string} status - Transaction status.
     * @returns {boolean} True if exists, false otherwise.
     */

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