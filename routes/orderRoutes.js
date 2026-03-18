const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");

const router = express.Router();

// GET /orders (pagination via ?page=&limit=)
router.get("", getOrders);
router.get("/", getOrders);

// POST /orders
router.post("", createOrder);
router.post("/", createOrder);

module.exports = router;
