const {DataTypes, Model} = require("sequelize");
const sequelize = require('../config/sequelizedDB');
const moment = require("moment");

class Section extends Model{}

Section.init(
    {
        section_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        section_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        row_count:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        seat_count:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        section_status: {
            type: DataTypes.ENUM,
            values: ['Available', 'Unavailable'],
            allowNull: false
        },
        event_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'sequelizedSectionModel',
        tableName: 'section',
        timestamps: false
    }
);

module.exports = Section;