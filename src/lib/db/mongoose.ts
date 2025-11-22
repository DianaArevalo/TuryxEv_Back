import { mongoose as mg } from '~/lib/shared/infrastructure';

export async function connectMongo(uri: string) {
  try {
    if (mg.connection.readyState >= mg.ConnectionStates.connected) return;
    await mg.connect(uri);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}
