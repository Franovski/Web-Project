const Section = require('../models/sectionModel.js');
const sectionService = require('../services/sectionService.js');
const { Request, Response } = require('express');

/**
 * Controller for handling section-related operations.
 */
class SectionController {
    /**
     * Creates a new section entry.
     * @param {Request} req - The request object containing section details.
     * @param {Response} res - The response object.
     */
    static async create(req, res) {
        try {
            const { name, rowCount, seatCount, status, eventId } = req.body;
            var section = new Section(0, name, rowCount, seatCount, status, eventId);
            const result = await sectionService.create(section);
            res.status(200).json({message: "Section created successfully", result});
        } catch (err) {
            console.error("Error in SectionController.create: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Updates an existing section entry.
     * @param {Request} req - The request object containing updated section details.
     * @param {Response} res - The response object.
     */
    static async update(req, res) {
        try {
            const { name, rowCount, seatCount, status, eventId } = req.body;
            const { id } = req.params;
            var section = new Section(id, name, rowCount, seatCount, status, eventId);
            const result = await sectionService.update(section);
            res.status(200).json({message: "Section updated successfully", result});
        } catch (err) {
            console.error("Error in SectionController.update: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Deletes a section entry by ID.
     * @param {Request} req - The request object containing section ID.
     * @param {Response} res - The response object.
     */
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await sectionService.delete(id);
            res.status(200).json({message: "Section deleted successfully", result});
        } catch (err) {
            console.error("Error in SectionController.delete: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Retrieves all section entries.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
    static async readAll(req, res) {
        try {
            const result = await sectionService.readAll();
            res.status(200).json({message: "Sections retrieved successfully", result});
        } catch (err) {
            console.error("Error in SectionController.readAll: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Retrieves a section entry by ID.
     * @param {Request} req - The request object containing section ID.
     * @param {Response} res - The response object.
     */
    static async readSectionById(req, res) {
        try {
            const { id } = req.params;
            const result = await sectionService.readSectionById(id);
            res.status(200).json({message: "Section retrieved successfully", result});
        } catch (err) {
            console.error("Error in SectionController.readSectionById: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Retrieves a section entry by name.
     * @param {Request} req - The request object containing section name.
     * @param {Response} res - The response object.
     */
    static async readSectionByName(req, res) {
        try {
            const { name } = req.params;
            const result = await sectionService.readSectionByName(name);
            res.status(200).json({message: "Section retrieved successfully", result});
        } catch (err) {
            console.error("Error in SectionController.readSectionByName: ", err.message);
            res.status(500).json(err.message);
        }
    }

    /**
     * Retrieves a section entry by status.
     * @param {Request} req - The request object containing section status.
     * @param {Response} res - The response object.
     */
    static async readSectionByStatus(req, res) {
        try {
            const { status } = req.params;
            const result = await sectionService.readSectionByStatus(status);
            res.status(200).json({message: "Sections retrieved successfully", result});
        } catch (err) {
            console.error("Error in SectionController.readSectionByStatus: ", err.message);
            res.status(500).json(err.message);
        }
    }
}

module.exports = SectionController;
