const Transaction = require("../models/sequelizedTransactionModel");
const Utils = require("../Utils/utils");

class TransactionRepository {
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

  static async delete(id) {
    try {
      return await Transaction.destroy({ where: { transaction_id: id } });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readAll() {
    try {
      return await Transaction.findAll();
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readTransactionById(id) {
    try {
      return await Transaction.findByPk(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readTransactionByStatus(status) {
    try {
      return await Transaction.findAll({
        where: { transaction_status: status },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async isTransactionExistById(id) {
    try {
      const transaction = await Transaction.findByPk(id);
      return transaction !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

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
