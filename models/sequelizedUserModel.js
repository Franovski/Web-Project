const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/sequelizedDB');
const moment = require('moment');

class User extends Model {}

User.init(
    {
        user_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        role:{
            type: DataTypes.ENUM,
            values: ['Admin', 'Customer'],
            allowNull: false
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get(){
                return moment(this.getDataValue('created_at')).format("YYYY-MM-DD");
            }
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number:{
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
    },
    {
        sequelize,
        modelName: 'sequelizedUserModel',
        tableName: 'user',
        timestamps: false
    }
);

module.exports = User;