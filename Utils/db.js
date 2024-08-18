const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Dbcon = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
    });
    console.log("CONNECTED TO DB");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};

module.exports = Dbcon;
