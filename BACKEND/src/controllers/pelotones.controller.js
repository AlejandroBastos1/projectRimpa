import PelotonSchema from '../models/PelotonSchema.js'


export const newPeloton = async (req, res) => {
    const {nombre, miembros} = req.body
    
    const createPeloton = new PelotonSchema ({
        nombre, 
        miembros
    }); 

    await createPeloton.save();

    console.log(createPeloton);

    res.send('Guardando Peloton...');

    console.log(nombre, miembros);
}

export const getPeloton = async (req, res) => {
    const getPeloton = await PelotonSchema.find(req.params.id);
    if(!getPeloton) return res.status(404).json({message : 'Peloton no encontrado'});
    res.json(getPeloton);
    console.log(req.body)
}

export const putPeloton = async (req, res) => {
    const putPeloton = await PelotonSchema.findByIdAndUpdate(req.params.id, req.body, {new : true});
    if (!putPeloton) return res.status(404).json({message : 'Peloton no encontrado'});
    res.json(putPeloton);
    
}

export const deletePeloton = async (req, res) => {
    const deletePeloton = await PelotonSchema.findByIdAndDelete(req.params.id);
    if (!deletePeloton) return res.status(404).json({message : 'Peloton no encontrado'});
    res.json(deletePeloton);
}