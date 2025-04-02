const {DataTypes, Model} = require("sequelize");
const sequelize = require('../config/sequelizedDB');
const moment = require("moment");

class Price extends Model{}

Price.init(
    {
        price_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ticket_price:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        event_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        section_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'sequelizedPriceModel',
        tableName: 'price',
        timestamps: false
    }
);

module.exports = Price;