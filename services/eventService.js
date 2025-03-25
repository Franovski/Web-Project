const EventRepository = require('../repositories/eventRepository');

class EventService {

    static async create(event)
    {
        try{
            return EventRepository.create(event);
        }catch(err){
            throw new Error(err);
        }
    }

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
}

module.exports = EventService;