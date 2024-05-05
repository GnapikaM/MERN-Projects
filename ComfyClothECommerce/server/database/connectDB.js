// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const CONNECTION_URL = process.env.CONNECTION_URL;

// const connectDB = async () => {
//   try {
//     await mongoose.connect(CONNECTION_URL);
//     console.log(
//       "Database Connected: ",
//       mongoose.connection.host,
//       mongoose.connection.name
//     );
//   } catch (error) {
//     console.error("Error connecting to the database:", error.message);
//     throw error;
//   }
// };

// export default connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_URL);
    console.log(
      "Database Connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log("MongoDB Connection Error", error);
    process.exit(1);
  }
};

export default connectDB;

// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const connectDB = () => {
//   const CONNECTION_URL = process.env.CONNECTION_URL;

//   mongoose.connect(CONNECTION_URL)
//     .then(() => {
//         console.log("Database Connected: ", mongoose.connection.host, mongoose.connection.name);
//     })
//     .catch(error => console.error(error.message));
// };

// export default connectDB;
