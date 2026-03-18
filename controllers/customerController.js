const Customer = require("../models/customer");

const parsePagination = (req) => {
  const page = Math.max(parseInt(req.query.page ?? "1", 10) || 1, 1);
  const limit = Math.min(
    Math.max(parseInt(req.query.limit ?? "10", 10) || 10, 1),
    100
  );
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

// POST /customers
const createCustomer = async (req, res) => {
  try {
    const { first_name, last_name, phone, email } = req.body;

    if (!first_name || !last_name) {
      return res.status(400).json({
        message: "first_name et last_name sont obligatoires",
      });
    }

    const customer = await Customer.create({
      first_name,
      last_name,
      phone: phone || null,
      email: email || null,
    });

    return res.status(201).json(customer);
  } catch (error) {
    console.error("Error createCustomer:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /customers?page=1&limit=10
const getCustomers = async (req, res) => {
  try {
    const { page, limit, offset } = parsePagination(req);
    const { count, rows } = await Customer.findAndCountAll({
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    return res.json({
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (error) {
    console.error("Error getCustomers:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
};

