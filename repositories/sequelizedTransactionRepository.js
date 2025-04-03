const Transaction = require("../models/sequelizedTransactionModel");
const Utils = require("../Utils/utils");

class TransactionRepository {

  /**
   * Creates a new transaction in the database.
   * @param {Transaction} transaction - The transaction object to be created.
   * @param {string} transaction.status - The status of the transaction (e.g., 'completed', 'pending').
   * @param {string} transaction.transactionDate - The date when the transaction occurred.
   * @param {number} transaction.amount - The amount of money involved in the transaction.
   * @param {string} transaction.currency - The currency used for the transaction (e.g., 'USD').
   * @param {string} transaction.paymentMethod - The payment method used (e.g., 'credit card', 'PayPal').
   * @param {string} transaction.refundReason - The reason for a refund if applicable.
   * @param {number} transaction.ticketId - The ID of the ticket associated with the transaction.
   * @param {number} transaction.userId - The ID of the user involved in the transaction.
   * @returns {Promise<Transaction>} The created transaction object.
   */
  static async create(transaction) {
    try {
      const addedTransaction = await Transaction.create({
        transaction_status: transaction.status,
        transaction_date: Utils.formatDateSQL(transaction.transactionDate),
        amount: transaction.amount,
        currency: transaction.currency,
        payment_method: transaction.paymentMethod,
        refund_reason: transaction.refundReason,
        ticket_id: transaction.ticketId,
        user_id: transaction.userId,
      });
      return addedTransaction;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Updates an existing transaction in the database.
   * @param {Transaction} transaction - The transaction object to be updated.
   * @param {string} transaction.status - The status of the transaction.
   * @param {string} transaction.transactionDate - The date when the transaction occurred.
   * @param {number} transaction.amount - The amount of money involved in the transaction.
   * @param {string} transaction.currency - The currency used for the transaction.
   * @param {string} transaction.paymentMethod - The payment method used.
   * @param {string} transaction.refundReason - The reason for a refund if applicable.
   * @param {number} transaction.ticketId - The ID of the ticket associated with the transaction.
   * @param {number} transaction.userId - The ID of the user involved in the transaction.
   * @returns {Promise<number>} The number of updated rows.
   */
  static async update(transaction) {
    try {
      const [updated] = await Transaction.update(
        {
          transaction_status: transaction.status,
          transaction_date: Utils.formatDateSQL(transaction.transactionDate),
          amount: transaction.amount,
          currency: transaction.currency,
          payment_method: transaction.paymentMethod,
          refund_reason: transaction.refundReason,
          ticket_id: transaction.ticketId,
          user_id: transaction.userId,
        },
        {
          where: { transaction_id: transaction.id },
        }
      );
      return updated;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Deletes a transaction from the database.
   * @param {number} id - The ID of the transaction to be deleted.
   * @returns {Promise<number>} The number of deleted rows.
   */
  static async delete(id) {
    try {
      return await Transaction.destroy({ where: { transaction_id: id } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves all transactions from the database.
   * @returns {Promise<Array>} A list of all transactions.
   */
  static async readAll() {
    try {
      return await Transaction.findAll();
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves a transaction by its ID.
   * @param {number} id - The ID of the transaction to be fetched.
   * @returns {Promise<Object|null>} The transaction object if found, or null if not found.
   */
  static async readTransactionById(id) {
    try {
      return await Transaction.findByPk(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves transactions by their status.
   * @param {string} status - The status of the transaction(s) to be fetched.
   * @returns {Promise<Array>} A list of transactions matching the status.
   */
  static async readTransactionByStatus(status) {
    try {
      return await Transaction.findAll({
        where: { transaction_status: status },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a transaction exists by its ID.
   * @param {number} id - The ID of the transaction to check.
   * @returns {Promise<boolean>} `true` if the transaction exists, otherwise `false`.
   */
  static async isTransactionExistById(id) {
    try {
      const transaction = await Transaction.findByPk(id);
      return transaction !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a transaction exists by its status.
   * @param {string} status - The status of the transaction to check.
   * @returns {Promise<boolean>} `true` if the transaction exists, otherwise `false`.
   */
  static async isTransactionExistByStatus(status) {
    try {
      const transaction = await Transaction.findOne({
        where: { transaction_status: status },
      });
      return transaction !== null;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = TransactionRepository;
