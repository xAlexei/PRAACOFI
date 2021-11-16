const router = require('express').Router();
const UserModel = require('../models/UsuarioModel');

//posteo de datos con encriptacion y validacion 
router.post('/', async(req, res)=>{
    let usuario = await UserModel.findOne({nombre: req.body.nombre})
    if(usuario)return res.status(400).send('')

        usuario = new UserModel({
            nombre: req.body.nombre,
            apellidoP: req.body.apellidoP,
            apellidoM: req.body.apellidoM,
            correo: req.body.correo,
            password: req.body.password,
            type: req.body.type
        })
        const result = await usuario.save();
        res.status(201).send('Usuario Registrado');
});

//LLAMADA DE DATOS 
router.get('/', async(req, res)=>{
    await UsuarioModel.find()
    .then(result =>{
        if(!result) res.json({ success: false, result: 'No se encuentran registros'});

        res.json({ success: true, result: result});
    })
    .catch(err => res.json({success: false, result: err}));
});
//MODIFICAR POR ID
router.put('/', async (req, res)=>{


    const user = await UsuarioModel.findByIdAndUpdate(req.params.id,{
        nombre: req.body.nombre,
        apellidoP: req.body.apellidoP,
        apellidoM: req.body.apellidoM,
        correo: req.body.correo,
        password: req.body.password,  
        type: req.body.type
    },
    {
        new: true
    })
    if(!user){
        return res.status(404).send('No existe');
    }
    res.status(204).send()
});
  //borrar
router.delete('/:id', async (req, res) =>{
    const user = await UsuarioModel.findOneAndDelete(req.params.id)

    if(!user){
        return res.status(404).send('El usuario con este ID no existe');
    }
    res.status(200).send('El usuario ha sido eliminado');
});

module.exports = router;