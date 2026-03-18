const Payment = require("../models/payment");

// POST /payments : créer un paiement pour une commande
const createPayment = async (req, res) => {
  try {
    const { order_id, amount, payment_method, status, payment_date } = req.body;

    if (!order_id || !amount || !payment_method) {
      return res.status(400).json({
        message: "order_id, amount et payment_method sont obligatoires",
      });
    }

    const payment = await Payment.create({
      order_id,
      amount,
      payment_method,
      status: status || "COMPLETED",
      payment_date: payment_date || new Date(),
    });

    return res.status(201).json(payment);
  } catch (error) {
    console.error("Error createPayment:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createPayment,
};

