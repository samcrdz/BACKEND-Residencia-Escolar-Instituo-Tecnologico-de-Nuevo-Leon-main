const usuariosModel = require("../model/usuario.model");

const getAllUsers = async (req, res) => {
  try {
    const usuario = await usuariosModel.getAllUsers();
    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuariosModel.getUserById(id);

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.status(200).json(usuario);
  } catch (err) {
    if (err.code === "22P02") {
      return res.status(400).send("ID del usuario no válido");
    }
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioDeleted = await usuariosModel.deleteUser(id);
    if (!usuarioDeleted) {
      return res.status(404).send("Usuario no encontrado");
    }
    res.status(200).json({
      message: "Usuario eliminado correctamente",
      client: usuarioDeleted,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
};

const createUser = async (req, res) => {
  const { nombre, usuario, email, contraseña, rol, estado } = req.body;
  try {
    const newUser = await usuariosModel.createUser(nombre, usuario, email, contraseña, rol, estado);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      return res.status(409).json({ message: 'El usuario o email ya existe' });
    }
    res.status(500).send("Error interno del servidor");
  }
};

// Nuevo método de login
const login = async (req, res) => {
  const { usuario, contraseña } = req.body;
  try {
    const user = await usuariosModel.authenticateUser(usuario, contraseña);

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    if (user) {
      console.log(`Usuario autenticado: ${user.usuario}`);
      res.cookie(`sessionId-admin-${user.usuario}`, true, {
        // httpOnly: true,
        secure: true,  
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000, // 1 día de duración
      });

      return res.status(200).json({ message: "Inicio de sesión exitoso", user });
    } else {
      console.error("Error durante la autenticación:", error);
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUserById,
  createUser,
  login,
};
