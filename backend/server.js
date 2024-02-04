require('dotenv').config({ path: './backend/.env' });const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

// ENV Config
dotenv.config({ path: "backend/config/config.env" });

// Connecting the database
connectDatabase()

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})