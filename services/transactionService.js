const TransactionRepository = require('../repositories/transactionRepository');
const TicketRepository = require('../repositories/ticketRepository');
const UserRepository = require('../repositories/userRepository');

class TransactionService {

    /**
     * Creates a new transaction entry.
     * 
     * @param {Transaction} transaction - The transaction data to be created.
     * @returns {Promise<Transaction>} The created transaction.
     * @throws {Error} If the creation fails.
     */
    static async create(transaction)
    {
        try{

            if(! await TicketRepository.isTicketExistById(transaction.ticketId)){
                throw new Error(`Ticket with id ${transaction.ticketId} does not exist`);
            }

            if(! await UserRepository.isUserExistById(transaction.userId)){
                throw new Error(`User with id ${transaction.userId} does not exist`);
            }

            return TransactionRepository.create(transaction);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Updates an existing transaction entry.
     * 
     * @param {Transaction} transaction - The transaction data to be updated.
     * @returns {Promise<Transaction>} The updated transaction.
     * @throws {Error} If the transaction does not exist or the update fails.
     */
    static async update(transaction)
    {
        try{
            if(! await TransactionRepository.isTransactionExistById(transaction.id)){
                throw new Error(`Transaction with id ${transaction.id} does not exist`);
            }

            if(! await TicketRepository.isTicketExistById(transaction.ticketId)){
                throw new Error(`Ticket with id ${transaction.ticketId} does not exist`);
            }

            if(! await UserRepository.isUserExistById(transaction.userId)){
                throw new Error(`User with id ${transaction.userId} does not exist`);
            }

            return TransactionRepository.update(transaction);
        }catch(err){
            throw new Error(err);
        }     
    }

    /**
     * Deletes a transaction entry by ID.
     * 
     * @param {number} id - The ID of the transaction to be deleted.
     * @returns {Promise<void>} A promise that resolves when the transaction is deleted.
     * @throws {Error} If the transaction does not exist or the deletion fails.
     */
    static async delete(id)
    {
        try{
            if(! await TransactionRepository.isTransactionExistById(id)){
                throw new Error(`Transaction with id ${id} does not exist`);
            }
            return TransactionRepository.delete(id);
        }catch(err){
            throw new Error(err);
        }     
    }

    /**
     * Fetches all transaction entries.
     * 
     * @returns {Promise<Array>} A list of all transactions.
     * @throws {Error} If fetching all transactions fails.
     */
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

    /**
     * Fetches a specific transaction entry by its ID.
     * 
     * @param {number} id - The ID of the transaction to fetch.
     * @returns {Promise<Transaction>} The transaction with the given ID.
     * @throws {Error} If the transaction does not exist or the fetch fails.
     */
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

    /**
     * Fetches transaction entries by their status.
     * 
     * @param {string} status - The status of the transactions to fetch.
     * @returns {Promise<Array>} A list of transactions with the given status.
     * @throws {Error} If fetching transactions by status fails.
     */
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
