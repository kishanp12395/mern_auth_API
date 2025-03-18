import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'mern_auth'
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    
    mongoose.connection.on("error", (err) => {
      console.error(`❌ MongoDB Connection Error: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB Disconnected! Reconnecting...");
      connectDB();
    });

  } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);  
  }
};

export default connectDB;




// import mongoose from "mongoose";

// const connectDB = async () => {

//     mongoose.connection.on('connected',()=>console.log('Database Connected'));
    
//     await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`)
// };

// export default connectDB;