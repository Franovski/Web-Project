const Price = require('../models/priceModel');
const priceService = require('../services/priceService.js');

class PriceController {

    static async create(req,res){
        try{
            const {ticketPrice, eventId, sectionId} = req.body;
            var price = new Price(0, ticketPrice, eventId, sectionId);
            const result = await priceService.create(price);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in PriceController.create: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async update(req,res){
        try{
            const {ticketPrice, eventId, sectionId} = req.body;
            const {id} = req.params;
            var price = new Price(id, ticketPrice, eventId, sectionId);
            const result = await priceService.update(price);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in PriceController.update: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async delete(req,res){
        try{
            const {id} = req.params;
            const result = await priceService.delete(id);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in PriceController.delete: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readAll(req,res){
        try{
            const result = await priceService.readAll();
            res.status(200).json(result);
        }catch(err){
            console.error("Error in PriceController.readAll: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readPriceById(req,res){
        try{
            const {id} = req.params;
            const result = await priceService.readPriceById(id);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in PriceController.readPriceById: " , err.message);
            res.status(500).json(err.message);
        }
    }
}

module.exports = PriceController;