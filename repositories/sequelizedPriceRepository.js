const Price = require("../models/sequelizedPriceModel");

class PriceRepository {

  /**
   * Creates a new price in the database.
   * @param {Price} price - The price object to be created.
   * @param {number} price.ticketPrice - The ticket price.
   * @param {number} price.eventId - The ID of the event associated with the price.
   * @param {number} price.sectionId - The ID of the section associated with the price.
   * @returns {Promise<Price>} The created price object.
   */
  static async create(price) {
    try {
      const addedPrice = await Price.create({
        ticket_price: price.ticketPrice,
        event_id: price.eventId,
        section_id: price.sectionId,
      });
      return addedPrice;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Updates an existing price in the database.
   * @param {Price} price - The price object to be updated.
   * @param {number} price.ticketPrice - The ticket price.
   * @param {number} price.eventId - The ID of the event associated with the price.
   * @param {number} price.sectionId - The ID of the section associated with the price.
   * @returns {Promise<number>} The number of updated rows.
   */
  static async update(price) {
    try {
      const [updated] = await Price.update(
        {
          ticket_price: price.ticketPrice,
          event_id: price.eventId,
          section_id: price.sectionId,
        },
        {
          where: { price_id: price.id },
        }
      );
      return updated;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Deletes a price from the database.
   * @param {number} id - The ID of the price to be deleted.
   * @returns {Promise<number>} The number of deleted rows.
   */
  static async delete(id) {
    try {
      return await Price.destroy({ where: { price_id: id } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves all prices from the database.
   * @returns {Promise<Array>} A list of all prices.
   */
  static async readAll() {
    try {
      return await Price.findAll();
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves a price by its ID.
   * @param {number} id - The ID of the price to be fetched.
   * @returns {Promise<Price|null>} The price object if found, or null if not found.
   */
  static async readPriceById(id) {
    try {
      return await Price.findByPk(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a price exists by its ID.
   * @param {number} id - The ID of the price to check.
   * @returns {Promise<boolean>} `true` if the price exists, otherwise `false`.
   */
  static async isPriceExistById(id) {
    try {
      const price = await Price.findByPk(id);
      return price !== null;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = PriceRepository;
