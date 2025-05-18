const Event = require("../models/eventModel");
const eventService = require("../services/eventService.js");
const categoryService = require("../services/categoryService.js");

class EventController {
  static async create(req, res) {
    try {
      const {
        name,
        date,
        time,
        location,
        capacity,
        status,
        description,
        image,
        categoryId,
      } = req.body;
      var event = new Event(
        0,
        name,
        date,
        time,
        location,
        capacity,
        status,
        description,
        image,
        categoryId
      );
      const result = await eventService.create(event);
      res.status(200).json({ message: "Event created successfully", result });
    } catch (err) {
      console.error("Error in EventController.create: ", err.message);
      res.status(500).json(err.message);
    }
  }

  static async update(req, res) {
    try {
      const {
        name,
        date,
        time,
        location,
        capacity,
        status,
        description,
        image,
        categoryId,
      } = req.body;
      const { id } = req.params;
      var event = new Event(
        id,
        name,
        date,
        time,
        location,
        capacity,
        status,
        description,
        image,
        categoryId
      );
      const result = await eventService.update(event);
      res.status(200).json({ message: "Event updated successfully", result });
    } catch (err) {
      console.error("Error in EventController.update: ", err.message);
      res.status(500).json(err.message);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await eventService.delete(id);
      res.status(200).json({ message: "Event deleted successfully", result });
    } catch (err) {
      console.error("Error in EventController.delete: ", err.message);
      res.status(500).json(err.message);
    }
  }

  static async readAll(req, res) {
    try {
      const result = await eventService.readAll();
      res
        .status(200)
        .json({ message: "Events retrieved successfully", result });
    } catch (err) {
      console.error("Error in EventController.readAll: ", err.message);
      res.status(500).json(err.message);
    }
  }

  static async readEventById(req, res) {
    try {
      const { id } = req.params;
      const result = await eventService.readEventById(id);
      res.status(200).json({ message: "Event retrieved successfully", result });
    } catch (err) {
      console.error("Error in EventController.readEventById: ", err.message);
      res.status(500).json(err.message);
    }
  }

  static async readEventByName(req, res) {
    try {
      const { name } = req.params;
      const result = await eventService.readEventByName(name);
      res.status(200).json({ message: "Event retrieved successfully", result });
    } catch (err) {
      console.error("Error in EventController.readEventByName: ", err.message);
      res.status(500).json(err.message);
    }
  }

  static async readEventByStatus(req, res) {
    try {
      const { status } = req.params;
      const result = await eventService.readEventByStatus(status);
      res.status(200).json({ message: "Event retrieved successfully", result });
    } catch (err) {
      console.error(
        "Error in EventController.readEventByStatus: ",
        err.message
      );
      res.status(500).json(err.message);
    }
  }

  static async readEventByCategoryId(req, res) {
    try {
      const { categoryId } = req.params;
      const result = await eventService.readEventByCategoryId(categoryId);
      res.status(200).json({ message: "Event retrieved successfully", result });
    } catch (err) {
      console.error(
        "Error in EventController.readEventByCategoryId: ",
        err.message
      );
      res.status(500).json(err.message);
    }
  }

  static async readEventDateById(req, res) {
    try {
      const { id } = req.params;
      const result = await eventService.readEventDateById(id);
      res
        .status(200)
        .json({ message: "Event date retrieved successfully", result });
    } catch (err) {
      console.error(
        "Error in EventController.readEventDateById: ",
        err.message
      );
      res.status(500).json(err.message);
    }
  }

  static async loadEventsView(req, res) {
    try {
      const cats = await categoryService.readAll();
      //console.log("Categories fetched:", cats);

      const categories = [];

      for (const cat of cats) {
        // Convert the string ID to an integer
        const categoryId = parseInt(cat.id, 10);
        if (isNaN(categoryId)) {
          console.warn("Invalid category ID:", cat.id);
          continue;
        }

        // Fetch events for this category
        let events = [];
        try {
          events = await eventService.readEventByCategoryId(categoryId);
        } catch (err) {
          // If no events or category doesn't exist, skip
          console.warn(`No events for category ${categoryId}`, err);
          continue;
        }

        if (events.length) {
          categories.push({ category: cat, events });
        }
      }

      return res.render("events", { categories });
    } catch (error) {
      console.error("Error fetching category events:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  // controllers/eventController.js
  static async loadAdminEvents(req, res) {
    try {
      const cats = await categoryService.readAll();
      const categories = [];

      for (const cat of cats) {
        const categoryId = parseInt(cat.id, 10);
        if (isNaN(categoryId)) continue;

        let events = [];
        try {
          events = await eventService.readEventByCategoryId(categoryId);
        } catch (err) {
          continue;
        }

        if (events.length) {
          categories.push({ category: cat, events });
        }
      }

      res.render("adminEvents", { categories });
    } catch (err) {
      console.error("Failed to load admin events view:", err);
      res.status(500).send("Internal Server Error");
    }
  }

  // Load the edit page
  static async loadEditEventPage(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).send("Invalid event ID");
    }

    try {
      const event = await eventService.readEventById(id);
      if (!event) {
        return res.status(404).send("Event not found");
      }
      // render the edit form view and pass the event
      return res.render("editEvent", { event });
    } catch (err) {
      console.error("Error loading edit page:", err);
      return res.status(500).send("Internal Server Error");
    }
  }

  static async updateEvent(req, res) {
    const eventId = parseInt(req.params.id, 10);
    if (isNaN(eventId)) {
      return res.status(400).send("Invalid event ID");
    }

    const updatedEvent = {
      id: eventId,
      name: req.body.name,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      capacity: req.body.capacity,
      status: req.body.status,
      description: req.body.description || null,
      image: req.body.image || null,
      categoryId: req.body.categoryId,
    };

    try {
      await eventService.update(updatedEvent);
      res.redirect("/menageEvents");
    } catch (err) {
      console.error("Error in updateEvent:", err.message);
      res.status(500).render("error", { message: "Failed to update event." });
    }
  }

  static async showEventForm(req, res) {
    try {
      const categories = await categoryService.readAll();
      const error = req.query.error; // may be undefined
      return res.render("createEvent", { error, categories });
    } catch (error) {
      console.error("Error rendering event form:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  static async createEventForm(req, res) {
    try {
      let {
        name,
        date,
        time,
        location,
        capacity,
        status,
        description,
        image,
        categoryId,
      } = req.body;

      // normalize optionals
      if (!description?.trim()) description = null;
      if (!image?.trim()) image = null;

      const event = new Event(
        0,
        name,
        date,
        time,
        location,
        capacity,
        status,
        description,
        image,
        categoryId
      );
      await eventService.create(event);

      // on success → redirect to listing
      return res.redirect("/viewEvents");
    } catch (error) {
      console.error("Error during event creation:", error);
      // on failure → redirect back to the form, including the error in the query string
      const msg = encodeURIComponent(
        "Event creation failed. Please try again."
      );
      return res.redirect(`/api/events/createEvent?error=${msg}`);
    }
  }
}

module.exports = EventController;
