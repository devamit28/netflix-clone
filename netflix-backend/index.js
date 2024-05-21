const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/userRoutes");

app.use(cors());

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://amitchowdhuryindia:amit1990@cluster0.zu5dhlh.mongodb.net/netflix"
  )
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoutes);

app.listen(5002, console.log("server started"));
