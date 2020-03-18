const express = require("express");
const dotenvs = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

//load env files
dotenvs.config({ path: "./config/config.env" });

//Connect to database
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");

const app = express();

//Body Parser
app.use(express.json());
// Dev logging middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//Mount Routers
app.use("/api/v1/bootcamps", bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// server is put in a constant to close the server (server.close() method in
//case there is error in connecting to DB)
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handle unhandled promise rejections while connecting to DB
process.on("unhandledRejection", (err, Promise) => {
  console.log(`Error: ${err.message}`);
  //Close server and exit process
  server.close(() => process.exit(1));
});
