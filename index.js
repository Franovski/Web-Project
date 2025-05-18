const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const pool = require("./config/db");
const ejs = require("ejs");
const UserService = require("./services/userService");
const EventService = require("./services/eventService");
const PORT = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes/authRoutes'));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/prices", require("./routes/priceRoutes"));
app.use("/api/sections", require("./routes/sectionRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    res.render("home.ejs", { title: "Home" });
  } catch (error) {
    console.error("Error rendering home page:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get ('/createEvent' , (req , res) => {
    try{
    res.render('createEvent.ejs');
    }catch(e){
        console.error('Error fetching Events:', error);
        res.status(500).send('Internal Server Error');  
    }
});

app.get("/Admin", (req, res) => {
    try{
    res.render("admin.ejs");
    }
    catch (error) {
        console.error("Error rendering admin page:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const testConnection = async () => {
  try {
    await pool.getConnection();
    console.log("Connected to the database successfully");
  } catch (err) {
    console.log("Failed to connect to the database");
    throw new Error(err);
  }
};

testConnection();
