const {DataTypes, Model} = require("sequelize");
const sequelize = require('../config/sequelizedDB');
const moment = require("moment");

class Ticket extends Model{}

Ticket.init(
    {
        ticket_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        ticket_status:{
            type: DataTypes.ENUM,
            values: ['Purchased', 'Refunded'],
            allowNull: false
        },
        seat_number:{
            type: DataTypes.STRING,
            allowNull: false
        },
            purchase_date:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get(){
                return moment(this.getDataValue('purchase_date')).format("YYYY-MM-DD");
            }
        },
        expiry_date:{
            type: DataTypes.DATE,
            allowNull: false,
            get(){
                return moment(this.getDataValue('expiry_date')).format("YYYY-MM-DD");
            }
        },
        qr_code:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        section_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        event_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'sequelizedTicketModel',
        tableName: 'ticket',
        timestamps: false
    }
);

module.exports = Ticket;