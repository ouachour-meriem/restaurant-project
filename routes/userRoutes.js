const express = require("express");

const { createUser, getUsers } = require("../controllers/userController");

const router = express.Router();

// POST /users
router.post("", createUser);
router.post("/", createUser);

// GET /users
router.get("", getUsers);
router.get("/", getUsers);

module.exports = router;
