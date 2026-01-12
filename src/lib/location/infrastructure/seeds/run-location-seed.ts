import mongoose from "mongoose";
import { CitySchema, LocationSchema } from "../schemas";
import locations from "./location-seed";
import { config } from "../../../../config/config";
 // ajusta el path si aplica

async function runLocationsSeed() {
  try {
    if (!config.mongoUri) {
      throw new Error("mongoUri is not defined in config");
    }

    await mongoose.connect(config.mongoUri);
    console.log("✅ Connected to MongoDB");

    // 1️⃣ Obtener ciudades
    const cities = await CitySchema.find();

    if (!cities.length) {
      throw new Error("No cities found. Run city seed first.");
    }

    // 2️⃣ Mapear cityName -> ObjectId
    const cityMap = new Map<string, mongoose.Types.ObjectId>(
      cities.map(city => [city.name, city._id as mongoose.Types.ObjectId])
    );

    // 3️⃣ Construir locations
    const docs = locations.map(loc => {
      const cityId = cityMap.get(loc.cityName);

      if (!cityId) {
        throw new Error(`City not found: ${loc.cityName}`);
      }

      return {
        city: cityId,
        address: loc.address,
        lat: loc.lat,
        lng: loc.lng,
      };
    });

    await LocationSchema.deleteMany({});
    await LocationSchema.insertMany(docs);

    console.log("✅ Locations seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding locations", error);
    process.exit(1);
  }
}

runLocationsSeed();
