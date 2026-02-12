require("dotenv").config();
const express = require("express");
const connectDB = require("./db");

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello, MongoDB:");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
