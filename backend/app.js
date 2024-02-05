const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path")

const errorMiddleware = require("./middlewares/error.js")

app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Import routes
const routes = require("./routes/index.js")

app.use("/backend-api", routes);
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


// Middleware for Error Handling
app.use(errorMiddleware)


module.exports = app;