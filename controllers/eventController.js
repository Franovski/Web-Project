const Event = require('../models/sequelizedEventModel.js');
const eventService = require('../services/eventService.js');
const { Request, Response } = require('express');

/**
 * Controller for handling event-related operations.
 */
class EventController {
    /**
     * Creates a new event.
     * @param {Request} req - The request object containing event details.
     * @param {Response} res - The response object.
     */
    static async create(req, res) {
        try {
            const { name, date, time, location, capacity, status, description, image, categoryId } = req.body;
            var event = new Event(0, name, date, time, location, capacity, status, description, image, categoryId);
            const result = await eventService.create(event);
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in EventController.create: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Updates an existing event.
     * @param {Request} req - The request object containing event details.
     * @param {Response} res - The response object.
     */
    static async update(req, res) {
        try {
            const { name, date, time, location, capacity, status, description, image, categoryId } = req.body;
            const { id } = req.params;
            var event = new Event(id, name, date, time, location, capacity, status, description, image, categoryId);
            const result = await eventService.update(event);
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in EventController.update: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Deletes an event by ID.
     * @param {Request} req - The request object containing event ID.
     * @param {Response} res - The response object.
     */
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await eventService.delete(id);
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in EventController.delete: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Retrieves all events.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
    static async readAll(req, res) {
        try {
            const result = await eventService.readAll();
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in EventController.readAll: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Retrieves an event by its ID.
     * @param {Request} req - The request object containing event ID.
     * @param {Response} res - The response object.
     */
    static async readEventById(req, res) {
        try {
            const { id } = req.params;
            const result = await eventService.readEventById(id);
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in EventController.readEventById: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Retrieves an event by its name.
     * @param {Request} req - The request object containing event name.
     * @param {Response} res - The response object.
     */
    static async readEventByName(req, res) {
        try {
            const { name } = req.params;
            const result = await eventService.readEventByName(name);
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in EventController.readEventByName: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Retrieves events by their status.
     * @param {Request} req - The request object containing event status.
     * @param {Response} res - The response object.
     */
    static async readEventByStatus(req, res) {
        try {
            const { status } = req.params;
            const result = await eventService.readEventByStatus(status);
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in EventController.readEventByStatus: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Retrieves events by category ID.
     * @param {Request} req - The request object containing category ID.
     * @param {Response} res - The response object.
     */
    static async readEventByCategoryId(req, res) {
        try {
            const { categoryId } = req.params;
            const result = await eventService.readEventByCategoryId(categoryId);
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in EventController.readEventByCategoryId: ", err.message);
            res.status(500).json(err.message);
        }
    }
}

module.exports = EventController;
