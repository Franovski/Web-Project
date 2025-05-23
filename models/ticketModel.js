class Ticket{
    constructor(id,status,price,seatNumber,purchaseDate,expiryDate,qrCode,sectionId,userId,eventId){
        this.id = id;
        this.status = status;
        this.price = price;
        this.seatNumber = seatNumber;
        this.purchaseDate = purchaseDate;
        this.expiryDate = expiryDate;
        this.qrCode = qrCode;
        this.sectionId = sectionId;
        this.userId = userId;
        this.eventId = eventId;
    }

    static fromRow(row){
        return new Ticket(
            row.ticket_id,
            row.ticket_status,
            row.ticket_price,
            row.seat_number,
            row.purchase_date,
            row.expiry_date,
            row.qr_code,
            row.section_id,
            row.user_id,
            row.event_id
        );
    }
}

module.exports = Ticket;