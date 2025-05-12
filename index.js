const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");
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
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "ejs");
//app.use(bodyParser.json());

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

app.get("/signup", (req, res) => {
  res.render("partials/signup");
});

app.get("/signin", (req, res) => {
    res.render("partials/signin");
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
