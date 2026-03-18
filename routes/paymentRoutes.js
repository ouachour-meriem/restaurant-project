const express = require("express");
const { createPayment } = require("../controllers/paymentController");

const router = express.Router();

// POST /payments
router.post("", createPayment);
router.post("/", createPayment);

module.exports = router;

