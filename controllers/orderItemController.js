const OrderItem = require("../models/orderItem");

// POST /order-items : ajouter un item à une commande existante
const addItemToOrder = async (req, res) => {
  try {
    const { order_id, product_id, quantity, price } = req.body;

    if (!order_id || !product_id || !quantity || !price) {
      return res.status(400).json({
        message: "order_id, product_id, quantity et price sont obligatoires",
      });
    }

    const orderItem = await OrderItem.create({
      order_id,
      product_id,
      quantity,
      price,
    });

    return res.status(201).json(orderItem);
  } catch (error) {
    console.error("Error addItemToOrder:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  addItemToOrder,
};

