const {DataTypes, Model} = require("sequelize");
const sequelize = require('../config/sequelizedDB');
const moment = require("moment");

class Event extends Model{}

Event.init(
    {
        event_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        event_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        event_date:{
            type: DataTypes.DATE,
            allowNull: false,
            get(){
                return moment(this.getDataValue('event_date')).format("YYYY-MM-DD");
            }
        },
        event_time:{
            type: DataTypes.TIME,
            allowNull: false,
            get(){
                return moment(this.getDataValue('event_time')).format("HH:mm:ss");
            }
        },
        event_location:{
            type: DataTypes.STRING,
            allowNull: false
        },
        event_capacity:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        event_status: {
            type: DataTypes.ENUM,
            values: ['Active', 'Cancelled'],
            allowNull: false
        },
        event_description:{
            type: DataTypes.STRING,
            allowNull: true
        },
        event_image:{
            type: DataTypes.STRING,
            allowNull: true
        },
        category_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'sequelizedEventModel',
        tableName: 'event',
        timestamps: false
    }
);

module.exports = Event;