const Section = require('../models/sequelizedSectionModel');
const SectionRepository = require('../repositories/sequelizedSectionRepository');

class SectionService {

    /**
     * Creates a new section entry.
     * 
     * @param {Section} section - The section data to be created.
     * @returns {Promise<Section>} The created section.
     * @throws {Error} If the creation fails.
     */
    static async create(section)
    {
        try{
            return SectionRepository.create(section);
        }catch(err){
            throw new Error(err);
        }    
    }

    /**
     * Updates an existing section entry.
     * 
     * @param {Section} section - The section data to be updated.
     * @returns {Promise<Section>} The updated section.
     * @throws {Error} If the section does not exist or the update fails.
     */
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

    /**
     * Deletes a section entry by ID.
     * 
     * @param {number} id - The ID of the section to be deleted.
     * @returns {Promise<void>} A promise that resolves when the section is deleted.
     * @throws {Error} If the section does not exist or the deletion fails.
     */
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

    /**
     * Fetches all section entries.
     * 
     * @returns {Promise<Array>} A list of all sections.
     * @throws {Error} If fetching all sections fails.
     */
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

    /**
     * Fetches a specific section entry by its ID.
     * 
     * @param {number} id - The ID of the section to fetch.
     * @returns {Promise<Section>} The section with the given ID.
     * @throws {Error} If the section does not exist or the fetch fails.
     */
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

    /**
     * Fetches a specific section entry by its name.
     * 
     * @param {string} name - The name of the section to fetch.
     * @returns {Promise<Section>} The section with the given name.
     * @throws {Error} If the section does not exist or the fetch fails.
     */
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

    /**
     * Fetches section entries by their status.
     * 
     * @param {string} status - The status of the sections to fetch.
     * @returns {Promise<Array>} A list of sections with the given status.
     * @throws {Error} If fetching sections by status fails.
     */
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
