class Event {
    constructor(id,name,date,time,location,capacity,status,description,image,categoryId) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.time = time;
        this.location = location;
        this.capacity = capacity;
        this.status = status;
        this.description = description;
        this.image = image;
        this.categoryId = categoryId;
    }

    static fromRow(row) {
        return new Event(
            row.event_id,
            row.event_name,
            row.event_date,
            row.event_time,
            row.event_location,
            row.event_capacity,
            row.event_status,
            row.event_description,
            row.event_image,
            row.category_id
        );
    }
}

module.exports = Event;