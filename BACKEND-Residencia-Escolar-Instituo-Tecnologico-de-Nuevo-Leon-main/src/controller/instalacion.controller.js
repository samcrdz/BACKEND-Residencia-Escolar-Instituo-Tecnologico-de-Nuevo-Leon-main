const instalacionesModel = require("../model/instalacion.model");

const getAllInstalaciones = async (req, res) => {
  try {
    const instalaciones = await instalacionesModel.getAllInstalaciones();
    res.status(200).json(instalaciones);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

const getInstalacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const instalacion = await instalacionesModel.getInstalacionById(id);

    if (!instalacion) {
      return res.status(404).send("Instalación no encontrada");
    }

    res.status(200).json(instalacion);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

const addNewInstalacion = async (req, res) => {
  try {
    const instalacionData = req.body;
    const newInstalacion = await instalacionesModel.addNewInstalacion(
      instalacionData
    );
    res.status(201).json(newInstalacion);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

const editInstalacion = async (req, res) => {
  try {
    const instalacionData = { ...req.body, id: req.params.id };
    const instalacionActualizada = await instalacionesModel.editInstalacion(
      instalacionData
    );

    if (!instalacionActualizada) {
      return res.status(404).send("Instalación no encontrada para actualizar");
    }

    res.status(200).json(instalacionActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

const deleteInstalacion = async (req, res) => {
  try {
    const { id } = req.params;
    const instalacionEliminada = await instalacionesModel.deleteInstalacion(id);

    if (!instalacionEliminada) {
      return res.status(404).send("Instalación no encontrada para eliminar");
    }

    res
      .status(200)
      .json({
        message: "Instalación eliminado correctamente",
        client: instalacionEliminada,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = {
  getAllInstalaciones,
  getInstalacionById,
  addNewInstalacion,
  editInstalacion,
  deleteInstalacion,
};
