import "dotenv/config";
import mongoose from "mongoose";
import { CitySchema } from "../schemas";
import cities from "./cities.seed";
import { config } from "../../../../config/config";


async function runCitiesSeed() {
  try {
    if (!config.mongoUri) {
      throw new Error("mongoUri is not defined in config");
    }

    await mongoose.connect(config.mongoUri);
    console.log("✅ Connected to MongoDB");

    await CitySchema.deleteMany({});
    await CitySchema.insertMany(cities);

    console.log("✅ Cities seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding cities", error);
    process.exit(1);
  }
}

runCitiesSeed();

