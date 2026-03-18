const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const orderItemRoutes = require("./routes/orderItemRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const sequelize = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Restaurant API is running");
});

// Routes Meriem
app.use("/order-items", orderItemRoutes);
app.use("/payments", paymentRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données :", err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
