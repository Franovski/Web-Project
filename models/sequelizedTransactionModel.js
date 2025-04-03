const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/sequelizedDB');
const moment = require('moment');

class Transaction extends Model {}

Transaction.init(
    {
        transaction_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        transaction_status:{
            type: DataTypes.ENUM,
            values: ['Paid', 'Refunded'],
            allowNull: false
        },
        transaction_date:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get(){
                return moment(this.getDataValue('transaction_date')).format("YYYY-MM-DD");
            }
        },
        amount:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        currency:{
            type: DataTypes.STRING,
            allowNull: false
        },
        payment_method:{
            type: DataTypes.STRING,
            allowNull: false
        },
        refund_reason:{
            type: DataTypes.STRING,
            allowNull: true
        },
        ticket_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'sequelizedTransactionModel',
        tableName: 'transaction',
        timestamps: false
    }
);

module.exports = Transaction;