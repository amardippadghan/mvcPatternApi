const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", userRoute);

const PORT = 7000; // Correct port

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(
    "mongodb+srv://padghanamardip:admin123@cluster0.pblkv9v.mongodb.net/your_database_name_here?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
