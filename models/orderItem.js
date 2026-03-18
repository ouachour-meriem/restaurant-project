const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Modèle OrderItem (table order_items)
const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "order_items",
    timestamps: false,
  }
);

// Relations (si les modèles correspondants existent dans votre repo)
// On évite de casser l'app si `models/order.js` ou `models/product.js` n'est pas encore créé.
try {
  const Order = require("./order");
  if (Order && typeof Order.hasMany === "function") {
    Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
    OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });
  }
} catch (e) {
  // modèles non présents (à compléter par d'autres membres)
}

try {
  const Product = require("./product");
  if (Product && typeof Product.hasMany === "function") {
    Product.hasMany(OrderItem, {
      foreignKey: "product_id",
      as: "orderItems",
    });
    OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });
  }
} catch (e) {
  // modèles non présents (à compléter par d'autres membres)
}

module.exports = OrderItem;

