const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Modèle Order (table orders)
const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "PENDING",
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    timestamps: false,
  }
);

// Relation customer -> orders (si `models/customer.js` existe)
try {
  const Customer = require("./customer");
  if (Customer && typeof Customer.hasMany === "function") {
    Customer.hasMany(Order, { foreignKey: "customer_id", as: "orders" });
    Order.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });
  }
} catch (e) {
  // modèle non présent (à compléter)
}

module.exports = Order;

