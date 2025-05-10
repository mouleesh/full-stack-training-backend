import mongoose from "mongoose";

function connectDB(){
  const atlasUrl = "mongodb+srv://mouleesh:guru@cluster0.edejl.mongodb.net/full-stack-training";

  try {
    mongoose.connect(atlasUrl);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(` Mongo Connection successful`);
  });
 
  dbConnection.on("error", (err) => {
    console.error(`Mongo connection error: ${err}`);
  });
  return;
}

export default connectDB;