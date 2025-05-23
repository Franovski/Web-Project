const Ticket = require("../models/ticketModel.js");
const ticketService = require("../services/ticketService.js");
const EventService = require("../services/eventService.js");
const moment = require("moment");
const qr = require("qr-image");
const fs = require("fs");
const SectionService = require("../services/sectionService.js");
//const inquirer = require('inquirer');

class TicketController {
  /**
   * Creates a new ticket, generates a QR code, and saves it.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  static async create(req, res) {
    try {
      const {
        status,
        price,
        seatNumber,
        expiryDate,
        sectionId,
        userId,
        eventId,
      } = req.body;
      const purchaseDate = moment().format("YYYY-MM-DD HH:mm:ss");

      // Fetch event details from the database
      const event = await EventService.readEventById(eventId);
      if (!event) {
        throw new Error(`Event with ID ${eventId} not found.`);
      }

      const eventDetails = `Event Name: ${event.name}, Date: ${event.date}, Time: ${event.time}, Location: ${event.location}, Status: ${event.status}`;
      const uniqueIdentifier = `${eventId}_${userId}_${Date.now()}`;
      const qrContent = `Event ID: ${eventId}, User ID: ${userId}, ${eventDetails}`;
      const qrImagePath = `./qr_codes/qr_${uniqueIdentifier}.png`;

      // Ensure the qr_codes directory exists
      if (!fs.existsSync("./qr_codes")) {
        fs.mkdirSync("./qr_codes");
      }

      // Generate and save the QR code
      const qr_svg = qr.image(qrContent, { type: "png" });
      qr_svg.pipe(fs.createWriteStream(qrImagePath));

      // Create a new ticket instance with the QR code path
      var ticket = new Ticket(
        0,
        status,
        price,
        seatNumber,
        purchaseDate,
        expiryDate,
        qrImagePath,
        sectionId,
        userId,
        eventId
      );
      const result = await ticketService.create(ticket);
      res.status(200).json({ message: "Ticket created successfully", result });
    } catch (err) {
      console.error("Error in TicketController.create: ", err.message);
      res.status(500).json(err.message);
    }
  }

  /**
   * Updates an existing ticket and regenerates the QR code.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  static async update(req, res) {
    try {
      const {
        status,
        price,
        seatNumber,
        expiryDate,
        sectionId,
        userId,
        eventId,
      } = req.body;
      const purchaseDate = moment().format("YYYY-MM-DD HH:mm:ss");
      const { id } = req.params;

      // Fetch event details from the database
      const event = await EventService.readEventById(eventId);
      if (!event) {
        throw new Error(`Event with ID ${eventId} not found.`);
      }

      const eventDetails = `Event Name: ${event.name}, Date: ${event.date}, Time: ${event.time}, Location: ${event.location}, Status: ${event.status}`;
      const uniqueIdentifier = `${eventId}_${userId}_${Date.now()}`;
      const qrContent = `Event ID: ${eventId}, User ID: ${userId}, ${eventDetails}`;
      const qrImagePath = `./qr_codes/qr_${uniqueIdentifier}.png`;

      // Ensure the qr_codes directory exists
      if (!fs.existsSync("./qr_codes")) {
        fs.mkdirSync("./qr_codes");
      }

      // Generate and save the QR code
      const qr_svg = qr.image(qrContent, { type: "png" });
      qr_svg.pipe(fs.createWriteStream(qrImagePath));

      // Update ticket instance with the QR code path
      var ticket = new Ticket(
        id,
        price,
        status,
        seatNumber,
        purchaseDate,
        expiryDate,
        qrImagePath,
        sectionId,
        userId,
        eventId
      );
      const result = await ticketService.update(ticket);
      res.status(200).json({ message: "Ticket updated successfully", result });
    } catch (err) {
      console.error("Error in TicketController.update: ", err.message);
      res.status(500).json(err.message);
    }
  }

  /**
   * Deletes a ticket by ID.
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await ticketService.delete(id);
      res.status(200).json({ message: "Ticket deleted successfully", result });
    } catch (err) {
      console.error("Error in TicketController.delete: ", err.message);
      res.status(500).json(err.message);
    }
  }

  /**
   * Retrieves all tickets.
   */
  static async readAll(req, res) {
    try {
      const result = await ticketService.readAll();
      res
        .status(200)
        .json({ message: "Tickets retrieved successfully", result });
    } catch (err) {
      console.error("Error in TicketController.readAll: ", err.message);
      res.status(500).json(err.message);
    }
  }

  /**
   * Retrieves a ticket by ID.
   */
  static async readTicketById(req, res) {
    try {
      const { id } = req.params;
      const result = await ticketService.readTicketById(id);
      res
        .status(200)
        .json({ message: "Ticket retrieved successfully", result });
    } catch (err) {
      console.error("Error in TicketController.readTicketById: ", err.message);
      res.status(500).json(err.message);
    }
  }

  /**
   * Retrieves tickets by status.
   */
  static async readTicketByStatus(req, res) {
    try {
      const { status } = req.params;
      const result = await ticketService.readTicketByStatus(status);
      res
        .status(200)
        .json({ message: "Tickets retrieved successfully", result });
    } catch (err) {
      console.error(
        "Error in TicketController.readTicketByStatus: ",
        err.message
      );
      res.status(500).json(err.message);
    }
  }

  static async loadTicketsView(req, res) {
    try {
      const tickets = await ticketService.readAll();

      const enrichedTickets = await Promise.all(
        tickets.map(async (ticket) => {
          const event = await EventService.readEventById(ticket.eventId);
          const section = await SectionService.readSectionById(
            ticket.sectionId
          );

          const formattedDate = event?.date
            ? moment(event.date).format("YYYY-MM-DD")
            : "Unknown Date";

          return {
            eventName: event?.name || "Unknown Event",
            eventDate: formattedDate,
            sectionName: section?.name || "Unknown Section",
            price: ticket.price,
          };
        })
      );

      res.render("tickets", { tickets: enrichedTickets });
    } catch (err) {
      console.error("Error in loadTicketsView:", err.message);
      res.status(500).send("Failed to load tickets.");
    }
  }
  
  static async loadTicketsByEvent(req, res) {
    try {
      const { eventId } = req.params;

      if (!eventId) {
        return res.status(400).send("Event ID is required");
      }

      const event = await EventService.readEventById(eventId);
      if (!event) {
        return res.status(404).send("Event not found");
      }

      const tickets = await ticketService.readTicketByEventId(eventId);

      const enrichedTickets = await Promise.all(
        tickets.map(async (ticket) => {
          const section = await SectionService.readSectionById(
            ticket.sectionId
          );

          const formattedDate = event.date
            ? moment(event.date).format("YYYY-MM-DD")
            : "Unknown Date";
          const formattedTime = event.time
            ? moment(event.time, "HH:mm:ss").format("HH:mm")
            : "Unknown Time";

          return {
            eventName: event.name || "Unknown Event",
            eventDate: formattedDate,
            eventTime: formattedTime,
            sectionName: section?.name || "Unknown Section",
            price: ticket.price,
          };
        })
      );

      res.render("ticketsByEvent", {
        tickets: enrichedTickets,
        eventName: event.name || "Unknown Event",
      });
    } catch (err) {
      console.error("Error in loadTicketsByEvent:", err.message);
      res.status(500).send("Failed to load tickets for the event.");
    }
  }
}
module.exports = TicketController;
