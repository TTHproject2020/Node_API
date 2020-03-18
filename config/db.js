const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  //conn.connection.host gives us the host in console
};

module.exports = connectDB;
//Export this module as connectDB to pull that into server.js

//No try catch used in this function. Unhandled promise is handled in server.js file
