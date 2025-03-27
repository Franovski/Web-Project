const Ticket = require('../models/ticketModel');
const ticketService = require('../services/ticketService.js');
const moment = require('moment');

class TicketController {

    static async create(req, res) {
        try{
            const {status, seatNumber, expiryDate, qrCode, sectionId, userId, eventId} = req.body;
            const purchaseDate = moment().format('YYYY-MM-DD HH:mm:ss');
            var ticket = new Ticket(0, status, seatNumber, purchaseDate, expiryDate, qrCode, sectionId, userId, eventId);
            const result = await ticketService.create(ticket);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in TicketController.create: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async update(req, res) {
        try{
            const {status, seatNumber, expiryDate, qrCode, sectionId, userId, eventId} = req.body;
            const purchaseDate = moment().format('YYYY-MM-DD HH:mm:ss');
            const {id} = req.params;
            var ticket = new Ticket(id, status, seatNumber, purchaseDate, expiryDate, qrCode, sectionId, userId, eventId);
            const result = await ticketService.update(ticket);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in TicketController.update: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async delete(req, res) {
        try{
            const {id} = req.params;
            const result = await ticketService.delete(id);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in TicketController.delete: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readAll(req, res) {
        try{
            const result = await ticketService.readAll();
            res.status(200).json(result);
        }catch(err){
            console.error("Error in TicketController.readAll: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readTicketById(req, res) {
        try{
            const {id} = req.params;
            const result = await ticketService.readTicketById(id);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in TicketController.readTicketById: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readTicketByStatus(req, res) {
        try{
            const {status} = req.params;
            const result = await ticketService.readTicketByStatus(status);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in TicketController.readTicketByStatus: " , err.message);
            res.status(500).json(err.message);
        }
    }
}

module.exports = TicketController;