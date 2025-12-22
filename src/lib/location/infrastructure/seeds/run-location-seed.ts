import mongoose from "mongoose";
import { CitySchema, LocationSchema } from "../schemas";
import locations from "./location-seed";


async function runLocationsSeed() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    // 1️⃣ Traemos todas las ciudades
    const cities = await CitySchema.find();

    if (!cities.length) {
      throw new Error("No cities found. Run city seed first.");
    }

    // 2️⃣ Creamos un mapa: cityName -> cityId
    const cityMap = new Map<string, mongoose.Types.ObjectId>(
  cities.map(city => [city.name, city._id as mongoose.Types.ObjectId] as [string, mongoose.Types.ObjectId])
);


    // 3️⃣ Construimos locations usando el ObjectId correcto
    const location = locations.map(loc => {
      const cityId = cityMap.get(loc.cityName);

      if (!cityId) {
        throw new Error(`City not found for location: ${loc.cityName}`);
      }

      return {
        city: cityId,
        address: loc.address,
        lat: loc.lat,
        lng: loc.lng,
      };
    });

    // 4️⃣ Limpiamos e insertamos
    await LocationSchema.deleteMany({});
    await LocationSchema.insertMany(location);

    console.log("Locations seeded successfully ✅");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding locations ❌", error);
    process.exit(1);
  }
}

runLocationsSeed();
