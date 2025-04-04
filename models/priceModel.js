class Price {
    constructor(id,ticketPrice,eventId,sectionId){
        this.id = id;
        this.ticketPrice = ticketPrice;
        this.eventId = eventId;
        this.sectionId = sectionId;
    }

    static fromRow(row) {
        return new Price(
            row.price_id,
            row.ticket_price,
            row.event_id,
            row.section_id
        );
    }
}

module.exports = Price;