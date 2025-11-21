import { mongoose } from '../shared/Infraestructure/External';

export async function connectMongo(uri: string) {
  try {
    if (mongoose.connection.readyState >= mongoose.ConnectionStates.connected)
      return;
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}
