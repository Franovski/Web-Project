const Event = require("../models/sequelizedEventModel");
const Utils = require("../Utils/utils");

class EventRepository {
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

  static async delete(id) {
    try {
      return await Event.destroy({ where: { event_id: id } });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readAll() {
    try {
      return await Event.findAll();
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readEventById(id) {
    try {
      return await Event.findByPk(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readEventByName(name) {
    try {
      return await Event.findAll({ where: { event_name: name } });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readEventByStatus(status) {
    try {
      return await Event.findAll({ where: { event_status: status } });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readEventByCategoryId(categoryId) {
    try {
      return await Event.findAll({ where: { category_id: categoryId } });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readEventDateById(id) {
    try {
      const event = await Event.findByPk(id);
      return event.event_date;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async isEventExistById(id) {
    try {
      const event = await Event.findByPk(id);
      return event !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async isEventExistByName(name) {
    try {
      const event = await Event.findAll({ where: { event_name: name } });
      return event.length !== 0;
    } catch (err) {
      throw new Error(err);
    }
  }

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
