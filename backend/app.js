const express = require("express");
const app = express();
const cors = require("cors")

app.use(express.json())
app.use(cors())

// Import routes
const routes = require("./routes/index.js")

app.use("/backend-api", routes);

module.exports = app;