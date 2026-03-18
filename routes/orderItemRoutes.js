const express = require("express");
const { addItemToOrder } = require("../controllers/orderItemController");

const router = express.Router();

// POST /order-items
router.post("", addItemToOrder);
router.post("/", addItemToOrder);

module.exports = router;

