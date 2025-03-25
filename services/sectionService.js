const SectionRepository = require('../repositories/sectionRepository');

class SectionService {

    static async create(section)
    {
        try{
            return SectionRepository.create(section);
        }catch(err){
            throw new Error(err);
        }    
    }

    static async update(section)
    {
        try{
            if(!SectionRepository.isSectionExistById(section.id)){
                throw new Error(`Section with id ${section.id} does not exist`);
            }
            return SectionRepository.update(section);
        }catch(err){
            throw new Error(err);
        }
    }

    static async delete(id)
    {
        try{
            if(!SectionRepository.isSectionExistById(id)){
                throw new Error(`Section with id ${id} does not exist`);
            }
            return SectionRepository.delete(id);
        }catch(err){
            throw new Error(err);
        }
    }

    static async readAll()
    {
        try {
            // Fetch all sections
            const sections = await SectionRepository.readAll();
    
            // Convert BigInt fields (if any) to strings in the entire array of sections
            const sectionsWithSafeBigInts = JSON.parse(
                JSON.stringify(sections, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return sectionsWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read all sections: ${err.message}`);
        }
    
    }

    static async readSectionById(id)
    {
        try {
            // Check if the section exists by ID
            const sectionExists = await SectionRepository.isSectionExistById(id);
            if (!sectionExists) {
                throw new Error(`Section with id ${id} does not exist`);
            }
    
            // Fetch the section by ID
            const section = await SectionRepository.readSectionById(id);
    
            // Convert BigInt fields (if any) to strings before returning
            const sectionWithSafeBigInts = JSON.parse(
                JSON.stringify(section, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return sectionWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read section by id: ${err.message}`);
        }
    }

    static async readSectionByName(name)
    {
        try {
            // Check if the section exists by name
            const sectionExists = await SectionRepository.isSectionExistByName(name);
            if (!sectionExists) {
                throw new Error(`Section with name ${name} does not exist`);
            }
    
            // Fetch the section by name
            const section = await SectionRepository.readSectionByName(name);
    
            // Convert BigInt fields (if any) to strings before returning
            const sectionWithSafeBigInts = JSON.parse(
                JSON.stringify(section, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return sectionWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read section by name: ${err.message}`);
        }
    }

    static async readSectionByStatus(status)
    {
        try {
            // Check if the section exists by status
            const sectionExists = await SectionRepository.isSectionExistByStatus(status);
            if (!sectionExists) {
                throw new Error(`Section with status ${status} does not exist`);
            }
            
            // Fetch the section by status
            const sections = await SectionRepository.readSectionByStatus(status);
    
            // Convert BigInt fields (if any) to strings in the entire array of sections
            const sectionsWithSafeBigInts = JSON.parse(
                JSON.stringify(sections, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return sectionsWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read section by status: ${err.message}`);
        }
    }
}

module.exports = SectionService;