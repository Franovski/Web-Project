const PriceRepository = require('../repositories/sequelizedPriceRepository');

class PriceService {

    static async create(price)
    {
        try{
            return PriceRepository.create(price);
        }catch(err){
            throw new Error(err);
        }
    }

    static async update(price)
    {
        try{
            if(!PriceRepository.isPriceExistById(price.id)){
                throw new Error(`Price with id ${price.id} does not exist`);
            }
            return PriceRepository.update(price);
        }catch(err){
            throw new Error(err);
        }     
    }

    static async delete(id)
    {
        try{
            if(!PriceRepository.isPriceExistById(id)){
                throw new Error(`Price with id ${id} does not exist`);
            }
            return PriceRepository.delete(id);
        }catch(err){
            throw new Error(err);
        }
    }

    static async readAll()
    {
        try {
            // Fetch all prices
            const prices = await PriceRepository.readAll();
    
            // Convert BigInt fields (if any) to strings in the entire array of prices
            const pricesWithSafeBigInts = JSON.parse(
                JSON.stringify(prices, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return pricesWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read all prices: ${err.message}`);
        }
    }

    static async readPriceById(id)
    {
        try {
            // Check if the price exists by ID
            const priceExists = await PriceRepository.isPriceExistById(id);
            if (!priceExists) {
                throw new Error(`Price with id ${id} does not exist`);
            }
    
            // Fetch the price by ID
            const price = await PriceRepository.readPriceById(id);
    
            // Convert BigInt fields (if any) to strings before returning
            const priceWithSafeBigInts = JSON.parse(
                JSON.stringify(price, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return priceWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read price by id: ${err.message}`);
        }  
    }
}

module.exports = PriceService;