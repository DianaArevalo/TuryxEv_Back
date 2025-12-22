import mongoose from "mongoose";
import { CitySchema } from "../schemas";
import cities from "./cities.seed";

async function runCitiesSeed() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    // Limpia la colección
    await CitySchema.deleteMany({});

    // Inserta ciudades
    await CitySchema.insertMany(cities);

    console.log("Cities seeded successfully ✅");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding cities ❌", error);
    process.exit(1);
  }
}

runCitiesSeed();
