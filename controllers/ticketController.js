const Ticket = require('../models/ticketModel');
const ticketService = require('../services/ticketService.js');
const EventService = require('../services/eventService.js');
const moment = require('moment');
const qr = require('qr-image');
const fs = require('fs');
//const inquirer = require('inquirer');

class TicketController {

    static async create(req, res) {
        try {
            const { status, seatNumber, expiryDate, sectionId, userId, eventId } = req.body;
            const purchaseDate = moment().format('YYYY-MM-DD HH:mm:ss');
    
            // Fetch event details from the database
            const event = await EventService.readEventById(eventId);
            if (!event) {
                throw new Error(`Event with ID ${eventId} not found.`);
            }
    
            // Extract the event details (you can adjust this to fit your database schema)
            const eventDetails = `Event Name: ${event.name}, Date: ${event.date}, Time: ${event.time}, 
            Location: ${event.location}, Status: ${event.status}`;
    
            // Generate a unique QR code file name by appending a timestamp and userId
            const uniqueIdentifier = `${eventId}_${userId}_${Date.now()}`;
            const qrContent = `Event ID: ${eventId}, User ID: ${userId}, ${eventDetails}`;
            const qrImagePath = `./qr_codes/qr_${uniqueIdentifier}.png`;
    
            // Ensure the qr_codes directory exists
            if (!fs.existsSync('./qr_codes')) {
                fs.mkdirSync('./qr_codes');
            }
    
            // Generate and save the QR code
            const qr_svg = qr.image(qrContent, { type: 'png' });
            qr_svg.pipe(fs.createWriteStream(qrImagePath));
    
            // Create a new ticket instance with the QR code path
            var ticket = new Ticket(0, status, seatNumber, purchaseDate, expiryDate, qrImagePath, sectionId, userId, eventId);
            const result = await ticketService.create(ticket);
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in TicketController.create: ", err.message);
            res.status(500).json(err.message);
        }
    }
    

    static async update(req, res) {
        try {
            const { status, seatNumber, expiryDate, sectionId, userId, eventId } = req.body;
            const purchaseDate = moment().format('YYYY-MM-DD HH:mm:ss');
            const { id } = req.params;
    
            // Fetch event details from the database
            const event = await EventService.readEventById(eventId);
            if (!event) {
                throw new Error(`Event with ID ${eventId} not found.`);
            }
    
            // Extract the event details
            const eventDetails = `Event Name: ${event.name}, Date: ${event.date}, Time: ${event.time}, 
            Location: ${event.location}, Status: ${event.status}`;
    
            // Generate a unique QR code file name by appending a timestamp and userId
            const uniqueIdentifier = `${eventId}_${userId}_${Date.now()}`;
            const qrContent = `Event ID: ${eventId}, User ID: ${userId}, ${eventDetails}`;
            const qrImagePath = `./qr_codes/qr_${uniqueIdentifier}.png`;
    
            // Ensure the qr_codes directory exists
            if (!fs.existsSync('./qr_codes')) {
                fs.mkdirSync('./qr_codes');
            }
    
            // Generate and save the QR code
            const qr_svg = qr.image(qrContent, { type: 'png' });
            qr_svg.pipe(fs.createWriteStream(qrImagePath));
    
            // Update ticket instance with the QR code path
            var ticket = new Ticket(id, status, seatNumber, purchaseDate, expiryDate, qrImagePath, sectionId, userId, eventId);
            const result = await ticketService.update(ticket);
            res.status(200).json(result);
        } catch (err) {
            console.error("Error in TicketController.update: ", err.message);
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