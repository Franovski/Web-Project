const Price = require("../models/sequelizedPriceModel");

class PriceRepository {
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

  static async delete(id) {
    try {
      return await Price.destroy({ where: { price_id: id } });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readAll() {
    try {
      return await Price.findAll();
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readPriceById(id) {
    try {
      return await Price.findByPk(id);
    } catch (err) {
      throw new Error(err);
    }
  }

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
