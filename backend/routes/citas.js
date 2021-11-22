const router = require('express').Router();
const CitasModel = require('../models/citas');

router.post('/registro_cita', async(req, res)=>{
    let citas = await CitasModel.findOne({nombre: req.body.nombre})
    if(citas)return res.status(400).send('');

        citas = new CitasModel({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            motivo: req.body.motivo,
            rfc: req.body.rfc
        })
        citas.save();
        res.status(201).json();

});

router.get('/mostrar_citas', async(req, res)=>{
    await CitasModel.find()
    .then(result =>{
        if(!result) res.json({ succes: false, result: 'No se encontraron registros'});

        res.json({ succes: true, result: result});
    }).catch(err => res.json({succes: false, result: err}));
});

router.put('/:id', async (req, res) => {

    const citas = await CitasModel.findByIdAndUpdate(req.params.id,{
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        motivo: req.nombre.motivo,
        rfc: req.body.nombre.rfc

    },
    {
        new: true
    })
    if(!citas){
        return res.status(404).send('No existe');
    }
    res.status(204).send()
});

module.exports = router;