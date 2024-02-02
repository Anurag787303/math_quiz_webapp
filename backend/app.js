const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/error.js")

app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Import routes
const routes = require("./routes/index.js")

app.use("/backend-api", routes);

// Middleware for Error Handling
app.use(errorMiddleware)


module.exports = app;