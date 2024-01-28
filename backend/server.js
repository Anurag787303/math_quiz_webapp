const app = require("./app");
const dotenv = require("dotenv");

// ENV Config
dotenv.config({ path: "backend/config/config.env" });

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})