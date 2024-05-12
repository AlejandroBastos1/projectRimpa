import IntegrantesCabinaSchema from "../models/IntegrantesCabinaSchema.js";

export const newIntegrantesCabina = async (req, res) => {
    const {nombre, cedula, libretaM, esPiloto} = req.body
    
    const createIntegranteCabina = new IntegrantesCabinaSchema ({
        nombre,
        cedula,
        libretaM,
        esPiloto
    });

    await createIntegranteCabina.save(); 

    console.log(createIntegranteCabina);

    res.send( 'Guardando Integrante de cabina...' );
    console.log(nombre, cedula, libretaM, esPiloto);

}

export const getIntegrantesCabinaPilotos = async (req, res) => {
    const getIntegrantesCabinaPilotos = await IntegrantesCabinaSchema.find({esPiloto: true});
    if(!getIntegrantesCabinaPilotos) return res.status(404).json({message : 'integrante no encontrado'});
    res.json(getIntegrantesCabinaPilotos);
    console.log(req.body)
}

export const getIntegrantesCabinaCopilotos = async (req, res) => {
    const getIntegrantesCabinaCopilotos = await IntegrantesCabinaSchema.find({esPiloto: false});
    if(!getIntegrantesCabinaCopilotos) return res.status(404).json({message : 'integrante no encontrado'});
    res.json(getIntegrantesCabinaCopilotos);
    console.log(req.body)
}

export const putIntegrantesCabina = async (req,res) => {
    const putIntegrantesCabina = await IntegrantesCabinaSchema.findByIdAndUpdate(req.params.id, req.body, {new : true});
    if (!putIntegrantesCabina) return res.status(404).json({message : 'Integrante no encontrado'});
    res.json(putIntegrantesCabina);
    
}

export const deleteIntegrantesCabina = async (req, res) => {
    const deleteIntegrantesCabina = await IntegrantesCabinaSchema.findByIdAndDelete(req.params.id);
    if (!deleteIntegrantesCabina) return res.status(404).json({message : 'Integrante no encontrado'});
    res.json(deleteIntegrantesCabina);
}
