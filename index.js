const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db');
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/prices', require('./routes/priceRoutes'));
app.use('/api/sections', require('./routes/sectionRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const testConnection = async () => {
    try {
        await pool.getConnection();
        console.log('Connected to the database successfully');
    }catch(err){
        console.log('Failed to connect to the database');
        throw new Error(err);
    }
}

testConnection();