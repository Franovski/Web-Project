const Section = require('../models/sequelizedSectionModel');

class SectionRepository {

    static async create(section) {
        try{
            const addedSection = await Section.create({
                section_name: section.name,
                row_count: section.rowCount,
                seat_count: section.seatCount,
                section_status: section.status,
                event_id: section.eventId
            });
            return addedSection;
        }catch(err){
            throw new Error(err);
        }
    }

    static async update(section) {
        try{
            const [updated] = await Section.update({
                section_name: section.name,
                row_count: section.rowCount,
                seat_count: section.seatCount,
                section_status: section.status,
                event_id: section.eventId
            },
            {
                where: { section_id: section.id }
            });
            return updated;
        }catch(err){
            throw new Error(err);
        } 
    }

    static async delete(id) {
        try{
            return await Section.destroy({where: {section_id: id}});
        }catch(err){
            throw new Error(err);
        }
    }

    static async readAll() {
        try{
            return await Section.findAll();
        }catch(err){
            throw new Error(err);
        }
    }

    static async readSectionById(id) {
        try{
            return await Section.findByPk(id);
        }catch(err){
            throw new Error(err);
        }
    }

    static async readSectionByName(name) {
        try{
            return await Section.findAll({where: {section_name: name}})
        }catch(err){
            throw new Error(err);
        }
    }

    static async readSectionByStatus(status) {
        try{
            return await Section.findAll({where: {section_status: status}});
        }catch(err){
            throw new Error(err);
        }
    }

    static async isSectionExistById(id) {
        try{
            const section = await Section.findByPk(id);
            return section !== null;
        }catch(err){
            throw new Error(err);
        }
    }

    static async isSectionExistByName(name) {
        try{
            const section = await Section.findOne({where: {section_name: name}});
            return section !== null;
        }catch(err){
            throw new Error(err);
        }
    }

    static async isSectionExistByStatus(status){
        try{
            const section = await Section.findOne({where: {section_status: status}});
            return section !== null;
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports = SectionRepository;