const router = require('express').Router();
const CitasModel = require('../models/citas');

router.post('/registro_cita', async(req, res)=>{
    let citas = await CitasModel.findOne({nombre: req.body.nombre})
    if(citas)return res.status(400).send('');

        citas = new CitasModel({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            motivo: req.body.motivo,
            fecha_cita: req.body.fecha_cita,
            hora: req.body.hora,
            area: req.body.area,
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
        motivo: req.body.motivo,
        fecha_cita: req.body.fecha_cita,
        area: req.body.area,
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

router.delete('/:id', async (req, res)=>{
    const citas = await CitasModel.findOneAndDelete(req.params.id)
    if(!citas){
        return res.status(404).send('Registro no encontrado');
    }
    res.status(200).send('La cita ha sido eliminada');
});

module.exports = router;