const Price = require('../models/priceModel');
const PriceRepository = require('../repositories/priceRepository');
const EventRepository = require('../repositories/eventRepository');
const SectionRepository = require('../repositories/sectionRepository');

class PriceService {

    /**
     * Creates a new price entry.
     * 
     * @param {Price} price - The price data to be created.
     * @returns {Promise<Price>} The created price.
     * @throws {Error} If the creation fails.
     */
    static async create(price)
    {
        try{
            return PriceRepository.create(price);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Updates an existing price entry.
     * 
     * @param {Price} price - The price data to be updated.
     * @returns {Promise<Price>} The updated price.
     * @throws {Error} If the price does not exist or the update fails.
     */
    static async update(price)
    {
        try{
            if(! await PriceRepository.isPriceExistById(price.id)){
                throw new Error(`Price with id ${price.id} does not exist`);
            }

            if(! await EventRepository.isEventExistById(price.eventId)){
                throw new Error(`Event with id ${price.eventId} does not exist`);
            }

            if(! await SectionRepository.isSectionExistById(price.sectionId)){
                throw new Error(`Section with id ${price.sectionId} does not exist`);
            }

            return PriceRepository.update(price);
        }catch(err){
            throw new Error(err);
        }     
    }

    /**
     * Deletes a price entry by ID.
     * 
     * @param {number} id - The ID of the price to be deleted.
     * @returns {Promise<void>} A promise that resolves when the price is deleted.
     * @throws {Error} If the price does not exist or the deletion fails.
     */
    static async delete(id)
    {
        try{
            if(! await PriceRepository.isPriceExistById(id)){
                throw new Error(`Price with id ${id} does not exist`);
            }
            return PriceRepository.delete(id);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Fetches all price entries.
     * 
     * @returns {Promise<Array>} A list of all prices.
     * @throws {Error} If fetching all prices fails.
     */
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

    /**
     * Fetches a specific price entry by its ID.
     * 
     * @param {number} id - The ID of the price to fetch.
     * @returns {Promise<Price>} The price with the given ID.
     * @throws {Error} If the price does not exist or the fetch fails.
     */
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
