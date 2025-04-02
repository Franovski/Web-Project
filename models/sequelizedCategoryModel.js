const {DataTypes, Model} = require("sequelize");
const sequelize = require('../config/sequelizedDB');
const moment = require("moment");

class Category extends Model{}

Category.init(
    {
        category_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        category_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'sequelizedCategoryModel',
        tableName: 'category',
        timestamps: false
    }
);

module.exports = Category;