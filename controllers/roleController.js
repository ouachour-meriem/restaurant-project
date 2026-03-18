const Role = require("../models/role");

// GET /roles
const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({ order: [["id", "ASC"]] });
    return res.status(200).json(roles);
  } catch (error) {
    console.error("Error getRoles:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  getRoles,
};
