import AvionSchema from "../models/AvionSchema.js";

export const newAvion = async (req, res) => {
  const { matricula, tipoAvion, capacidadCarga } = req.body;

  const createAvion = new AvionSchema({
    matricula,
    tipoAvion,
    capacidadCarga,
  });

  await createAvion.save();

  console.log(createAvion);

  res.send("Guardando Integrante...");
  console.log(matricula, tipoAvion, capacidadCarga);
};

export const getAvion = async (req, res) => {
  const getAvion = await AvionSchema.find(req.params.id);
  if (!getAvion)
    return res.status(404).json({ message: "Avion no encontrado" });
  res.json(getAvion);
  console.log(req.body);
};

export const putAvion = async (req, res) => {
  const putAvion = await AvionSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!putAvion)
    return res.status(404).json({ message: "Avion no encontrado" });
  res.json(putAvion);
};

export const deleteAvion = async (req, res) => {
  const deleteAvion = await AvionSchema.findByIdAndDelete(req.params.id);
  if (!deleteAvion)
    return res.status(404).json({ message: "Avion no encontrado" });
  res.json(deleteAvion);
};
