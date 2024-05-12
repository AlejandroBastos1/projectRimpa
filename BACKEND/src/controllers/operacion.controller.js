import OperacionSchema from "../models/OperacionSchema.js";

const populatedFields = [
  { path: "ciudadSalida ciudadAterrizaje", select: "-_id municipio" },
  { path: "infoAvion", select: "-_id matricula tipoAvion capacidadCarga" },
  { path: "infoPiloto infoCopiloto", select: "-_id nombre libretaM" },
  {
    path: "materialAbordo",
    populate: { path: "material", select: "-_id nombre onuId clase" },
  },
  {
    path: "tripulacion",
    select: "-_id -__v",
    populate: { path: "miembros", select: "-_id nombre libretaM" },
  },
];

export const createOperation = async (req, res) => {
  const {
    infoAvion,
    infoPiloto,
    infoCopiloto,
    tripulacion,
    ciudadSalida,
    ciudadAterrizaje,
    fechaSalida,
    horaSalida,
    materialAbordo,
  } = req.body;
  const newOperation = new OperacionSchema({
    autor: req.user.id,
    infoAvion,
    infoPiloto,
    infoCopiloto,
    tripulacion,
    ciudadSalida,
    ciudadAterrizaje,
    fechaSalida,
    horaSalida,
    materialAbordo,
  });

  const savedOperation = await newOperation.save();
  res.json(savedOperation);
};

export const getOperations = async (req, res) => {
  const getOperation = await OperacionSchema.find({
    autor: req.user.id,
  }).populate(populatedFields);
  if (!getOperation)
    return res.status(404).json({ message: "operacion no encontrada" });
  res.json(getOperation);
  console.log(req.body);
};

export const getOperation = async (req, res) => {
  const getOperation = await OperacionSchema.find({ autor: req.user.id });
  if (!getOperation)
    return res.status(404).json({ message: "operacion no encontrada" });
  res.json(getOperation);
  console.log(req.body);
};

export const deleteOperation = async (req, res) => {
  const deletedOperation = await OperacionSchema.findByIdAndDelete(req.params.id);
  if (deletedOperation)
    return res.status(404).json({ message: "operacion no encontrada" });
  res.json(deletedOperation);
  console.log(req.body);
};

export const putOperation = async (req, res) => {};
