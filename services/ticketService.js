const TicketRepository = require('../repositories/ticketRepository');
const EventRepository = require('../repositories/eventRepository');

class TicketService {

    static async create(ticket) 
    {
        try {
            // Validate if expiry date is after purchase date
            if (ticket.purchaseDate > ticket.expiryDate) {
                throw new Error("Expiry date must be after the purchase date.");
            }

            const eventDate = await EventRepository.readEventDateById(ticket.eventId);

            const formattedExpiryDate = ticket.expiryDate.split('T')[0];  // Assuming ISO string
            const formattedEventDate = eventDate.toISOString().split('T')[0];

            // Validate that the expiry date matches the event date
            if (formattedExpiryDate !== formattedEventDate) {
                throw new Error(`Expiry date must be the same as the event date: ${formattedEventDate}`);
            }

            return TicketRepository.create(ticket);
        } catch (err) {
            throw new Error(err);
        }
    }

    static async update(ticket) 
    {
        try {
            // Check if the ticket exists
            if (!await TicketRepository.isTicketExistById(ticket.id)) {
                throw new Error(`Ticket with id ${ticket.id} does not exist`);
            }

            // Validate if expiry date is after purchase date
            if (ticket.purchaseDate > ticket.expiryDate) {
                throw new Error("Expiry date must be after the purchase date.");
            }

            return TicketRepository.update(ticket);
        } catch (err) {
            throw new Error(err);
        }
    }

    static async delete(id)
    {
        try{
            if(!TicketRepository.isTicketExistById(id)){
                throw new Error(`Ticket with id ${id} does not exist`);
            }
            return TicketRepository.delete(id);
        }catch(err){
            throw new Error(err);
        }
    }

    static async readAll()
    {
        try {
            // Fetch all tickets
            const tickets = await TicketRepository.readAll();
    
            // Convert BigInt fields (if any) to strings in the entire array of tickets
            const ticketsWithSafeBigInts = JSON.parse(
                JSON.stringify(tickets, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return ticketsWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read all tickets: ${err.message}`);
        }
    }

    static async readTicketById(id)
    {
        try {
            // Check if the ticket exists by ID
            const ticketExists = await TicketRepository.isTicketExistById(id);
            if (!ticketExists) {
                throw new Error(`Ticket with id ${id} does not exist`);
            }
    
            // Fetch the ticket by ID
            const ticket = await TicketRepository.readTicketById(id);
    
            // Convert BigInt fields (if any) to strings before returning
            const ticketWithSafeBigInts = JSON.parse(
                JSON.stringify(ticket, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return ticketWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read ticket by id: ${err.message}`);
        }
    }

    static async readTicketByStatus(status)
    {
        try {
            // Check if the ticket exists by status
            const ticketExists = await TicketRepository.isTicketExistByStatus(status);
            if (!ticketExists) {
                throw new Error(`Ticket with status ${status} does not exist`);
            }
    
            // Fetch the ticket by status
            const tickets = await TicketRepository.readTicketByStatus(status);
    
            // Convert BigInt fields (if any) to strings before returning
            const ticketsWithSafeBigInts = JSON.parse(
                JSON.stringify(tickets, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return ticketsWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read tickets by status: ${err.message}`);
        }    
    }
}

module.exports = TicketService;