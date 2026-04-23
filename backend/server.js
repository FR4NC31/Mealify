import app from "./src/app.js"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import dns from 'dns'

dotenv.config()

dns.setServers(process.env.DNS_SERVER.split(','))

const PORT = process.env.PORT || 5000

console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded ✅" : "Missing ❌");

//MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🟢 MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on PORT: ${PORT}`);
    });

  } catch (error) {
    console.error("🔴 MongoDB connection failed");
    console.error(error.message);
    process.exit(1); // stop app if DB fails
  }
};

connectDB();