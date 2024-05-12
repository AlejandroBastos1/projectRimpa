import IntegrantesPSchema from "../models/IntegrantesPSchema.js"

export const newIntegrantesPeloton = async (req, res) => {
    const {nombre, cedula, libretaM, peloton} = req.body
    
    const createIntegrante = new IntegrantesPSchema ({
        nombre,
        cedula,
        libretaM,
        peloton
    });

    await createIntegrante.save(); 

    console.log(createIntegrante);

    res.send( 'Guardando Integrante...' );
    console.log(nombre, cedula, libretaM, peloton);
    console.log(typeof(peloton));
}

export const getIntegrantesPeloton = async (req, res) => {
    const getIntegrante = await IntegrantesPSchema.find(req.params.id);
    if(!getIntegrante) return res.status(404).json({message : 'integrante no encontrado'});
    res.json(getIntegrante);
    console.log(req.body)
}

export const putIntegrantesPeloton = async (req,res) => {
    const putIntegrante = await IntegrantesPSchema.findByIdAndUpdate(req.params.id, req.body, {new : true});
    if (!putIntegrante) return res.status(404).json({message : 'Integrante no encontrado'});
    res.json(putIntegrante);
    
}

export const deleteIntegrantesPeloton = async (req, res) => {
    const deleteIntegrante = await IntegrantesPSchema.findByIdAndDelete(req.params.id);
    if (!deleteIntegrante) return res.status(404).json({message : 'Integrante no encontrado'});
    res.json(deleteIntegrante);
}
