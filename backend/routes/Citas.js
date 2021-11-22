const router = require('express').Router();
const CitasModel = require('../models/CitasModel');

router.post('/', async(req, res)=>{
    let citas = await CitasModel.findOne({nombre: req.body.nombre})
    if(citas)return res.status(400).send('');

        citas = new CitasModel({
            nombre: req.body.nombre,
            apellidoP: req.body.apellidoP,
            apellidoM: req.body.apellidoM,
            motivo: req.body.motivo,
            RFC: req.body.RFC
        })
        const result = await citas.save();
        res.status(201).send('Cita Rigistrada');

});

router.get('/', async(req, res)=>{
    await CitasModel.find()
    .then(result =>{
        if(!result) res.json({ succes: false, result: 'No se encontraron registros'});

        res.json({ succes: true, result: result});
    }).catch(err => res.json({succes: false, result: err}));
});

router.put('/', async(req, res)=>{
    const citas = await CitasMOdel.findByIdAndUpdate(req.params.id,{
        nombre: req.body.nombre,
        apellidoP: req.body.apellidoP,
        apellidoM: req.body.apellidoM,
        motivo: req.body.motivo,
        RFC: req.body.RFC

    },
    {
        new: true
    })
    if(!citas){
        return res.status(404).send('NO existe');
    }
    res.status(204).send();
});

router.delete('/:id', async (req, res)=>{
    const citas = await CitasModel.findOneAndDelete(req.params.id)
    if(!user){
        return res.status(404).send('Registro no encontrado');
    }
    res.status(200).send('La cita ha sido eliminado')
});

module.exports = router;