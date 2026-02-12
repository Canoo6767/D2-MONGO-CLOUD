import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import User from "./User.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

connectDB();
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor conectado a MongoDB 🚀");
});

// Crear usuario
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ver usuarios
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🟢 Server running on port ${port}`);
});
