import app from "./app.js";
// import {PORT} from "./src/config/config.js";

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})