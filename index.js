require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const User = require("./User"); // ← corregido

const app = express();
const port = process.env.PORT || 5000;

connectDB();
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor conectado a MongoDB 🚀");
});

// Crear usuario (POST)
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

// Ver todos los usuarios (GET)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ver un usuario por ID (GET)
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🟢 Server running on port ${port}`);
});
