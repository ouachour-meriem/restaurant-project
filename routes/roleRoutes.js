const express = require("express");
const { getRoles } = require("../controllers/roleController");

const router = express.Router();

// GET /roles
router.get("", getRoles);
router.get("/", getRoles);

module.exports = router;
