const TransactionRepository = require('../repositories/sequelizedTransactionRepository');

class TransactionService {

    static async create(transaction)
    {
        try{
            return TransactionRepository.create(transaction);
        }catch(err){
            throw new Error(err);
        }
    }

    static async update(transaction)
    {
        try{
            if(!TransactionRepository.isTransactionExistById(transaction.transaction_id)){
                throw new Error(`Transaction with id ${transaction.transaction_id} does not exist`);
            }
            return TransactionRepository.update(transaction);
        }catch(err){
            throw new Error(err);
        }     
    }

    static async delete(id)
    {
        try{
            if(!TransactionRepository.isTransactionExistById(id)){
                throw new Error(`Transaction with id ${id} does not exist`);
            }
            return TransactionRepository.delete(id);
        }catch(err){
            throw new Error(err);
        }     
    }

    static async readAll()
    {
        try {
            // Fetch all transactions
            const transactions = await TransactionRepository.readAll();
    
            // Convert BigInt fields (if any) to strings in the entire array of transactions
            const transactionsWithSafeBigInts = JSON.parse(
                JSON.stringify(transactions, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return transactionsWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read all transactions: ${err.message}`);
        }   
    }

    static async readTransactionById(id)
    {
        try {
            // Check if the transaction exists by ID
            const transactionExists = await TransactionRepository.isTransactionExistById(id);
            if (!transactionExists) {
                throw new Error(`Transaction with id ${id} does not exist`);
            }
    
            // Fetch the transaction by ID
            const transaction = await TransactionRepository.readTransactionById(id);
    
            // Convert BigInt fields (if any) to strings before returning
            const transactionWithSafeBigInts = JSON.parse(
                JSON.stringify(transaction, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return transactionWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read transaction by id: ${err.message}`);
        }       
    }

    static async readTransactionByStatus(status)
    {
        try {
            // Check if the transaction exists by status
            const transactionExists = await TransactionRepository.isTransactionExistByStatus(status);
            if (!transactionExists) {
                throw new Error(`Transaction with status ${status} does not exist`);
            }
    
            // Fetch the transactions by status
            const transactions = await TransactionRepository.readTransactionByStatus(status);
    
            // Convert BigInt fields (if any) to strings before returning
            const transactionsWithSafeBigInts = JSON.parse(
                JSON.stringify(transactions, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return transactionsWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read transactions by status: ${err.message}`);
        }   
    }
}

module.exports = TransactionService;