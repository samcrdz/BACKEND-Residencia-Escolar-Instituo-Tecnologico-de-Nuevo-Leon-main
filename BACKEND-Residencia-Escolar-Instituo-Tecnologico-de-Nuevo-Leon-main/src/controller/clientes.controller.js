const clientesModel = require("../model/clientes.model");

const getAllClientes = async (req, res) => {
  try {
    const clientes = await clientesModel.getAllClientes();
    res.status(200).json(clientes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await clientesModel.getClientById(id);

    if (!cliente) {
      return res.status(404).send("Cliente no encontrado");
    }

    res.status(200).json(cliente);
  } catch (err) {
    if (err.code === "22P02") {
      return res.status(400).send("ID de cliente no válido");
    }
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
};

const addNewClient = async (req, res) => {
  try {
    const clientData = req.body;
    const newClient = await clientesModel.addNewClient(clientData);
    res.status(201).json(newClient);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
};

const editClient = async (req, res) => {
  try {
    const clientData = req.body;
    const clientDataWithId = { ...clientData, id: req.params.id };
    const clientUpdated = await clientesModel.editClient(clientDataWithId);

    if (!clientUpdated) {
      return res.status(404).send("Cliente no encontrado para actualizar");
    }
    res.status(200).json(clientUpdated);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const clientDeleted = await clientesModel.deleteClient(id);
    if (!clientDeleted) {
      return res.status(404).send("Cliente no encontrado");
    }
    res.status(200).json({ message: "Cliente eliminado correctamente", client: clientDeleted });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = {
  getAllClientes,
  getClientById,
  addNewClient,
  editClient,
  deleteClient
};
