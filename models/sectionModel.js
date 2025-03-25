class Section {
    constructor(id,name,rowCount,seatCount,status,eventId){
        this.id = id;
        this.name = name;
        this.rowCount = rowCount;
        this.seatCount = seatCount;
        this.status = status;
        this.eventId = eventId;
    }

    static fromRow(row) {
        return new Section(
            row.section_id,
            row.section_name,
            row.row_count,
            row.seat_count,
            row.section_status,
            row.event_id
        );
    }
}

module.exports = Section;