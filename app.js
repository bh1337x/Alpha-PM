// Import required Modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Get the API routes
const listApiRoute = require("./api/listApiRoute");

// Create new Express app
const app = express();

// Read ENV variables
dotenv.config();

// Connect to MongoDB server
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log(`connected to mongodb at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
}).catch(err => {
    console.error(`mongodb connection error : [ ${err} ]`);
});

// Setup Express middleware
app.use(morgan(":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length]"));
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup public folder
app.use(express.static('public'));

// Setup API routes
app.use("/api/list", listApiRoute);

// Listen for requests
app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`app listening at ${process.env.APP_HOST}:${process.env.APP_PORT}`);
});