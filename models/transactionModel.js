class Transaction {
    constructor(id,status,transactionDate,amount,currency,paymentMethod,refundReason,ticketId,userId){
        this.id = id;
        this.status = status;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.currency = currency;
        this.paymentMethod = paymentMethod;
        this.refundReason = refundReason;
        this.ticketId = ticketId;
        this.userId = userId;
    }

    static fromRow(row){
        return new Transaction(
            row.transaction_id,
            row.transaction_status,
            row.transaction_date,
            row.amount,
            row.currency,
            row.payment_method,
            row.refund_reason,
            row.ticket_id,
            row.user_id
        );
    }
}

module.exports = Transaction;