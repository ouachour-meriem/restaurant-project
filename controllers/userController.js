const User = require("../models/user");
const Role = require("../models/role");

// POST /users
const createUser = async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;

    if (!name || !email || !password || !role_id) {
      return res.status(400).json({
        message: "name, email, password et role_id sont obligatoires",
      });
    }

    const user = await User.create({ name, email, password, role_id });
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error createUser:", error);

    if (error && error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Cet email existe déjà" });
    }

    if (error && error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({ message: "role_id invalide" });
    }

    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /users
const getUsers = async (req, res) => {
  try {
    const pageNum = req.query.page ? Number(req.query.page) : null;
    const limitNum = req.query.limit ? Number(req.query.limit) : null;

    const include = [{ model: Role, as: "role" }];

    // Si page/limit ne sont pas fournis, on renvoie juste tous les users
    if (!pageNum || !limitNum || Number.isNaN(pageNum) || Number.isNaN(limitNum)) {
      const users = await User.findAll({
        include,
        order: [["id", "DESC"]],
      });
      return res.status(200).json(users);
    }

    const page = pageNum < 1 ? 1 : pageNum;
    const limit = limitNum < 1 ? 10 : limitNum;
    const offset = (page - 1) * limit;

    const users = await User.findAll({
      include,
      limit,
      offset,
      order: [["id", "DESC"]],
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error getUsers:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createUser,
  getUsers,
};
