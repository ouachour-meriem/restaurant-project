const express = require("express");
const {
  createCustomer,
  getCustomers,
} = require("../controllers/customerController");

const router = express.Router();

// GET /customers (pagination via ?page=&limit=)
router.get("", getCustomers);
router.get("/", getCustomers);

// POST /customers
router.post("", createCustomer);
router.post("/", createCustomer);

module.exports = router;
