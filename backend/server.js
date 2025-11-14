import { connectDB } from "./src/config/db.js";
import app from "./src/app.js";
import { ENV } from "./src/config/env.js";

connectDB();

app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on port ${ENV.PORT}`);
});
