const Section = require('../models/sectionModel');
const sectionService = require('../services/sectionService.js');

class SectionController {

    static async create(req, res) {
        try{
            const {name, rowCount, seatCount, status, eventId} = req.body;
            var section = new Section(0, name, rowCount, seatCount, status, eventId);
            const result = await sectionService.create(section);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in SectionController.create: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async update(req, res) {
        try{
            const {name, rowCount, seatCount, status, eventId} = req.body;
            const {id} = req.params;
            var section = new Section(id, name, rowCount, seatCount, status, eventId);
            const result = await sectionService.update(section);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in SectionController.update: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async delete(req, res) {
        try{
            const {id} = req.params;
            const result = await sectionService.delete(id);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in SectionController.delete: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readAll(req, res) {
        try{
            const result = await sectionService.readAll();
            res.status(200).json(result);
        }catch(err){
            console.error("Error in SectionController.readAll: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readSectionById(req, res) {
        try{
            const {id} = req.params;
            const result = await sectionService.readSectionById(id);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in SectionController.readSectionById: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readSectionByName(req, res) {
        try{
            const {name} = req.params;
            const result = await sectionService.readSectionByName(name);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in SectionController.readSectionByName: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readSectionByStatus(req, res) {
        try{
            const {status} = req.params;
            const result = await sectionService.readSectionByStatus(status);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in SectionController.readSectionByStatus: " , err.message);
            res.status(500).json(err.message);
        }
    }
}

module.exports = SectionController;