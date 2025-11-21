import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

const runSeeders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌱 MongoDB connected for seeding");

    const seedersDir = path.join(__dirname, "src/seeders");

    // Get all *.seed.js files except index.js
    const files = fs.readdirSync(seedersDir).filter(
      (file) =>
        file.endsWith(".seed.js") &&
        file !== "index.js"
    );

    for (const file of files) {
      console.log(`➡ Running seeder: ${file}`);

      const seederFn = (await import(`./${file}`)).default;

      if (typeof seederFn === "function") {
        await seederFn();
        console.log(`✔ Completed: ${file}`);
      } else {
        console.warn(`⚠ Skipped (no function exported): ${file}`);
      }
    }

    console.log("🎉 All seeders executed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeder Error:", err);
    process.exit(1);
  }
};

runSeeders();
