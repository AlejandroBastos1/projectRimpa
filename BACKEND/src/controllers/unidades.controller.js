import unidadesMilitaresSchema from "../models/UnidadesMilitaresAereas.js"

export const newUnidadMilitar = async (req, res) => {
    const {nombre, municipio, departamento, comandante} = req.body
    
    const createUnidadMilitar = new unidadesMilitaresSchema ({
        nombre,
        municipio,
        departamento,
        comandante
    });

    await createUnidadMilitar.save(); 

    console.log(createUnidadMilitar);

    res.send( 'Guardando Unidad Militar...' );
    console.log(nombre, municipio, departamento, comandante);
}

export const getUnidadMilitar = async (req, res) => {
    const getUnidadMilitar = await unidadesMilitaresSchema.find(req.params.id);
    if(!getUnidadMilitar) return res.status(404).json({message : 'Unidad no encontrado'});
    res.json(getUnidadMilitar);
    console.log(req.body)
}

export const putUnidadMilitar = async (req,res) => {
    const putUnidadMilitar = await unidadesMilitaresSchema.findByIdAndUpdate(req.params.id, req.body, {new : true});
    if (!putUnidadMilitar) return res.status(404).json({message : 'Unidad no encontrado'});
    res.json(putUnidadMilitar);
    
}

export const deleteUnidadMilitar = async (req, res) => {
    const deleteUnidadMilitar = await unidadesMilitaresSchema.findByIdAndDelete(req.params.id);
    if (!deleteUnidadMilitar) return res.status(404).json({message : 'Unidad no encontrado'});
    res.json(deleteUnidadMilitar);
}
