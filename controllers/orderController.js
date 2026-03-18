const Order = require("../models/order");

const parsePagination = (req) => {
  const page = Math.max(parseInt(req.query.page ?? "1", 10) || 1, 1);
  const limit = Math.min(
    Math.max(parseInt(req.query.limit ?? "10", 10) || 10, 1),
    100
  );
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

// POST /orders
const createOrder = async (req, res) => {
  try {
    const { customer_id, status, total_amount, order_date } = req.body;

    if (!customer_id) {
      return res.status(400).json({ message: "customer_id est obligatoire" });
    }

    const order = await Order.create({
      customer_id,
      status: status || "PENDING",
      total_amount: total_amount ?? 0,
      order_date: order_date ? new Date(order_date) : undefined,
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error("Error createOrder:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /orders?page=1&limit=10
const getOrders = async (req, res) => {
  try {
    const { page, limit, offset } = parsePagination(req);

    const include = [];
    try {
      const Customer = require("../models/customer");
      include.push({ model: Customer, as: "customer" });
    } catch (e) {
      // ignore if model isn't present
    }

    const { count, rows } = await Order.findAndCountAll({
      limit,
      offset,
      order: [["id", "DESC"]],
      include,
    });

    return res.json({
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (error) {
    console.error("Error getOrders:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createOrder,
  getOrders,
};

