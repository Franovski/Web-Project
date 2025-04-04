const Event = require('../models/eventModel');
const eventService = require('../services/eventService.js');

class EventController{

    static async create(req,res){
        try{
            const {name,date,time,location,capacity,status,description,image,categoryId} = req.body;
            var event = new Event(0,name,date,time,location,capacity,status,description,image,categoryId);
            const result = await eventService.create(event);
            res.status(200).json({message: "Event created successfully", result});
        }catch(err){
            console.error("Error in EventController.create: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async update(req,res){
        try{
            const {name,date,time,location,capacity,status,description,image,categoryId} = req.body;
            const {id} = req.params;
            var event = new Event(id,name,date,time,location,capacity,status,description,image,categoryId);
            const result = await eventService.update(event);
            res.status(200).json({message: "Event updated successfully", result});
        }catch(err){
            console.error("Error in EventController.update: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async delete(req,res){
        try{
            const {id} = req.params;
            const result = await eventService.delete(id);
            res.status(200).json({message: "Event deleted successfully", result});
        }catch(err){
            console.error("Error in EventController.delete: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readAll(req,res){
        try{
            const result = await eventService.readAll();
            res.status(200).json({message: "Events retrieved successfully", result});
        }catch(err){
            console.error("Error in EventController.readAll: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readEventById(req,res){
        try{
            const {id} = req.params;
            const result = await eventService.readEventById(id);
            res.status(200).json({message: "Event retrieved successfully", result});
        }catch(err){
            console.error("Error in EventController.readEventById: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readEventByName(req,res){
        try{
            const {name} = req.params;
            const result = await eventService.readEventByName(name);
            res.status(200).json({message: "Event retrieved successfully", result});
        }catch(err){
            console.error("Error in EventController.readEventByName: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readEventByStatus(req,res){
        try{
            const {status} = req.params;
            const result = await eventService.readEventByStatus(status);
            res.status(200).json({message: "Event retrieved successfully", result});
        }catch(err){
            console.error("Error in EventController.readEventByStatus: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readEventByCategoryId(req,res){
        try{
            const {categoryId} = req.params;
            const result = await eventService.readEventByCategoryId(categoryId);
            res.status(200).json({message: "Event retrieved successfully", result});
        }catch(err){
            console.error("Error in EventController.readEventByCategoryId: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readEventDateById(req,res){
        try{
            const {id} = req.params;
            const result = await eventService.readEventDateById(id);
            res.status(200).json({message: "Event date retrieved successfully", result});
        }catch(err){
            console.error("Error in EventController.readEventDateById: " , err.message);
            res.status(500).json(err.message);
        }
    }
}

module.exports = EventController;