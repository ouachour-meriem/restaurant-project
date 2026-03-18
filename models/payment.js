const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Modèle Payment (table payments)
const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "PENDING",
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "payments",
    timestamps: false,
  }
);

// Relation (si `models/order.js` existe dans votre repo)
try {
  const Order = require("./order");
  if (Order && typeof Order.hasMany === "function") {
    Order.hasMany(Payment, { foreignKey: "order_id", as: "payments" });
    Payment.belongsTo(Order, { foreignKey: "order_id", as: "order" });
  }
} catch (e) {
  // modèle non présent (à compléter par d'autres membres)
}

module.exports = Payment;

