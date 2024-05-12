import MercanciasSchema from "../models/MercanciasSchema.js"


export const newMaterial = async (req, res) => {
    const { nombre, onuId, clase } = req.body

    const createMaterial = new MercanciasSchema ({
        nombre,
        onuId,
        clase
    });

    await createMaterial.save();
    
    console.log(createMaterial);

    res.send('Guardando Material...');
    console.log (nombre, onuId, clase);
}

export const getMaterial = async (req, res) => {
    const getMaterial = await MercanciasSchema.find(req.params.id);
    if(!getMaterial) return res.status(404).json({ message : 'Item no encontrado '})
    res.json(getMaterial);
    console.log(req.body)
}

export const putMaterial = async (req, res) => {
    putMaterial = await MercanciasSchema.findByIdAndUpdate(req.params.id, req.body, {new : true});
    if (!putMaterial) return res.status(404).json({ message : 'Item no encontrado'});
    res.json(putMaterial);

}

export const deleteMaterial = async (req, res) => {
    const deleteMaterial = await MercanciasSchema.findByIdAndDelete(req.params.id);
    if (!deleteMaterial) return res.status(404).json ({ message : 'Item no encontrado'});
    res.json(deleteMaterial);
}