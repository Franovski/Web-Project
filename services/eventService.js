const EventRepository = require('../repositories/sequelizedEventRepository');

class EventService {

    /**
     * Creates a new event.
     * 
     * @param {Event} event - The event data to be created.
     * @returns {Promise<Event>} The created event.
     * @throws {Error} If the creation fails.
     */
    static async create(event)
    {
        try{
            return EventRepository.create(event);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Updates an existing event.
     * 
     * @param {Event} event - The event data to be updated.
     * @returns {Promise<Event>} The updated event.
     * @throws {Error} If the event does not exist or the update fails.
     */
    static async update(event)
    {
        try{
            if(!EventRepository.isEventExistById(event.id)){
                throw new Error(`Event with id ${event.id} does not exist`);
            }
            return EventRepository.update(event);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Deletes an event by ID.
     * 
     * @param {number} id - The ID of the event to be deleted.
     * @returns {Promise<void>} A promise that resolves when the event is deleted.
     * @throws {Error} If the event does not exist or the deletion fails.
     */
    static async delete(id)
    {
        try{
            if(!EventRepository.isEventExistById(id)){
                throw new Error(`Event with id ${id} does not exist`);
            }
            return EventRepository.delete(id);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Fetches all events.
     * 
     * @returns {Promise<Array>} A list of all events.
     * @throws {Error} If fetching all events fails.
     */
    static async readAll()
    {
        try {
            // Fetch all events
            const events = await EventRepository.readAll();
    
            // Convert BigInt fields (if any) to strings in the entire array of events
            const eventsWithSafeBigInts = JSON.parse(
                JSON.stringify(events, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return eventsWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read all events: ${err.message}`);
        }
    }

    /**
     * Fetches a specific event by its ID.
     * 
     * @param {number} id - The ID of the event to fetch.
     * @returns {Promise<Object>} The event with the given ID.
     * @throws {Error} If the event does not exist or the fetch fails.
     */
    static async readEventById(id)
    {
        try {
            // Check if the event exists by ID
            const eventExists = await EventRepository.isEventExistById(id);
            if (!eventExists) {
                throw new Error(`Event with id ${id} does not exist`);
            }
    
            // Fetch the event by ID
            const event = await EventRepository.readEventById(id);
    
            // Convert BigInt fields (if any) to strings before returning
            const eventWithSafeBigInts = JSON.parse(
                JSON.stringify(event, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return eventWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read event by id: ${err.message}`);
        }    
    }

    /**
     * Fetches a specific event by its name.
     * 
     * @param {string} name - The name of the event to fetch.
     * @returns {Promise<Event>} The event with the given name.
     * @throws {Error} If the event does not exist or the fetch fails.
     */
    static async readEventByName(name)
    {
        try {
            // Check if the event exists by name
            const eventExists = await EventRepository.isEventExistByName(name);
            if (!eventExists) {
                throw new Error(`Event with name ${name} does not exist`);
            }
    
            // Fetch the event by name
            const event = await EventRepository.readEventByName(name);
    
            // Convert BigInt fields (if any) to strings before returning
            const eventWithSafeBigInts = JSON.parse(
                JSON.stringify(event, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return eventWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read event by name: ${err.message}`);
        }
    }

    /**
     * Fetches events by their status.
     * 
     * @param {string} status - The status of the events to fetch.
     * @returns {Promise<Array>} A list of events with the given status.
     * @throws {Error} If fetching events by status fails.
     */
    static async readEventByStatus(status)
    {
        try {
            // Check if the event exists by status
            const eventExists = await EventRepository.isEventExistByStatus(status);
            if (!eventExists) {
                throw new Error(`Event with status ${status} does not exist`);
            }

            // Fetch the event by status
            const events = await EventRepository.readEventByStatus(status);
    
            // Convert BigInt fields (if any) to strings before returning
            const eventsWithSafeBigInts = JSON.parse(
                JSON.stringify(events, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return eventsWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read event by status: ${err.message}`);
        }
    }

    /**
     * Fetches events by their category ID.
     * 
     * @param {number} categoryId - The category ID of the events to fetch.
     * @returns {Promise<Array>} A list of events with the given category ID.
     * @throws {Error} If fetching events by category ID fails.
     */
    static async readEventByCategoryId(categoryId) {
        try {
            const result = await EventRepository.readEventByCategoryId(categoryId);
            // If result contains BigInt values, convert them to strings
            return JSON.parse(JSON.stringify(result, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ));
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Fetches the event date by its ID.
     * 
     * @param {number} id - The ID of the event.
     * @returns {Promise<Event>} The event date for the event with the given ID.
     * @throws {Error} If fetching the event date fails.
     */
    static async readEventDateById(id) {
        try {
            const eventDate = await EventRepository.readEventDateById(id);
    
            // Convert BigInt values to string if necessary
            // Ensure any BigInt fields (like event ID) are converted to string
            const eventDateString = JSON.parse(
                JSON.stringify(eventDate, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return eventDateString;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = EventService;
