const router = require('express').Router();
const perfil = require('./../models/perfil');
const PerfilModel = require('./../models/perfil');

router.post('/perfil', async(req, res)=>{
    let perfil = await PerfilModel.findOne({nombre: req.body.nombre})
    if(perfil)return res.status(400).send('');

    perfil = new PerfilModel({
        nombre: req.body.nombre,
        email: req.body.email,
        direccion: req.body.direccion,
        ciudad: req.body.cuidad,
        pais: req.body.pais,
        cp: req.body.cp,
        telefono: req.body.telefono,
        ocupacion: req.body.ocupacion
    })
    perfil.save();
    res.status(201).json();
});

//Get all profiles

router.get('/mostrar_perfil', async(req, res)=>{
    await PerfilModel.find()
    .then(result =>{
        if(!result) res.json({ succes: false, result: 'No se encontraron registros'});

        res.json({ succes: true, result: result});
    }).catch(err => res.json({succes: false, result: err}));
});

//Get one profile

router.get('/perfil/:id', async(req, res)=>{
    await PerfilModel.find()
    .then(result =>{
        if(!result) res.json({ succes: false, result: 'No se encontraron registros'});

        res.json({ succes: true, result: result});
    }).catch(err => res.json({succes: false, result: err}));
});

module.exports = router;
