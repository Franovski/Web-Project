const Event = require("../models/sequelizedEventModel");
const Utils = require("../Utils/utils");

class EventRepository {

  /**
   * Creates a new event in the database.
   * @param {Event} event - The event object to be created.
   * @returns {Promise<Event>} The created event object.
   */
  static async create(event) {
    try {
      const addedEvent = await Event.create({
        event_name: event.name,
        event_date: Utils.formatDateSQL(event.date),
        event_time: Utils.formatTimeSQL(event.time),
        event_location: event.location,
        event_capacity: event.capacity,
        event_status: event.status,
        event_description: event.description,
        event_image: event.image,
        category_id: event.categoryId,
      });
      return addedEvent;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Updates an existing event in the database.
   * @param {Event} event - The event object to be updated.
   * @returns {Promise<number>} The number of updated rows.
   */
  static async update(event) {
    try {
      const [updated] = await Event.update(
        {
          event_name: event.name,
          event_date: Utils.formatDateSQL(event.date),
          event_time: Utils.formatTimeSQL(event.time),
          event_location: event.location,
          event_capacity: event.capacity,
          event_status: event.status,
          event_description: event.description,
          event_image: event.image,
          category_id: event.categoryId,
        },
        {
          where: { event_id: event.id },
        }
      );
      return updated;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Deletes an event from the database.
   * @param {number} id - The ID of the event to be deleted.
   * @returns {Promise<number>} The number of deleted rows.
   */
  static async delete(id) {
    try {
      return await Event.destroy({ where: { event_id: id } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves all events from the database.
   * @returns {Promise<Array>} A list of all events.
   */
  static async readAll() {
    try {
      return await Event.findAll();
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves an event by its ID.
   * @param {number} id - The ID of the event to be fetched.
   * @returns {Promise<Event|null>} The event object if found, or null if not found.
   */
  static async readEventById(id) {
    try {
      return await Event.findByPk(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves events by their name.
   * @param {string} name - The name of the event to be fetched.
   * @returns {Promise<Array>} A list of events that match the name.
   */
  static async readEventByName(name) {
    try {
      return await Event.findAll({ where: { event_name: name } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves events by their status.
   * @param {string} status - The status of the event to be fetched.
   * @returns {Promise<Array>} A list of events that match the status.
   */
  static async readEventByStatus(status) {
    try {
      return await Event.findAll({ where: { event_status: status } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves events by their category ID.
   * @param {number} categoryId - The category ID of the event to be fetched.
   * @returns {Promise<Array>} A list of events that match the category ID.
   */
  static async readEventByCategoryId(categoryId) {
    try {
      return await Event.findAll({ where: { category_id: categoryId } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves the event date by event ID.
   * @param {number} id - The ID of the event whose date is to be fetched.
   * @returns {Promise<Date>} The date of the event.
   */
  static async readEventDateById(id) {
    try {
      const event = await Event.findByPk(id);
      return event.event_date;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if an event exists by its ID.
   * @param {number} id - The ID of the event to check.
   * @returns {Promise<boolean>} `true` if the event exists, otherwise `false`.
   */
  static async isEventExistById(id) {
    try {
      const event = await Event.findByPk(id);
      return event !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if an event exists by its name.
   * @param {string} name - The name of the event to check.
   * @returns {Promise<boolean>} `true` if the event exists, otherwise `false`.
   */
  static async isEventExistByName(name) {
    try {
      const event = await Event.findAll({ where: { event_name: name } });
      return event.length !== 0;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if an event exists by its status.
   * @param {string} status - The status of the event to check.
   * @returns {Promise<boolean>} `true` if the event exists, otherwise `false`.
   */
  static async isEventExistByStatus(status) {
    try {
      const event = await Event.findAll({ where: { event_status: status } });
      return event.length !== 0;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = EventRepository;
