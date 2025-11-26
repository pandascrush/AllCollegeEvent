import { connectDB } from "./src/config/db.js";
import app from "./src/app.js";
import dotenv from 'dotenv'

dotenv.config()

connectDB();

app.listen(process.env.PORT, "0.0.0.0" ,() => {
    console.log(`Server running on port ${process.env.PORT}`);
});
