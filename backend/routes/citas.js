const router = require('express').Router();
const citas = require('../models/citas');
const CitasModel = require('../models/citas');
const usuario = require('../models/usuario');

//Create appointment

router.post('/registro_cita', async(req, res)=>{
    let citas = await CitasModel.findOne({usuario: req.body.usuario})
    // if(!citas)return res.status(400).send('');

        citas = new CitasModel({
            usuario: req.body.usuario,
            motivo: req.body.motivo,
            fecha_cita: req.body.fecha_cita,
            hora: req.body.hora,
            area: req.body.area,
            rfc: req.body.rfc
        })
        citas.save();
        res.status(201).send(citas);

});

//Get motivos

router.get('/motivos', async(req, res)=>{
    const citas = await CitasModel.find().select('motivo');
    const [_id, ...data] = citas;
    return res.status(201).send(data);
});





//Get all appointment

  router.get("/mostrar_citas", function (req, res) {
    citas.find({}, function (err, citas) {
      usuario.populate(citas, { path: "usuario" }, function (err, citas) {
        res.status(200).send(citas);
      });
    });
  });


  //Get one 

 
router.get('/cita/:id', async (req, res)=>{
    await CitasModel.findOne()
    .then((result)=>{
      if(!result)
        res.json({succes: false, result: "No se econtro la cita"});

        res.json({ succes: true, result: result});
    })
    .catch((err)=> res.json({succes: false, result: err}));
});


//Delete 

router.delete('/:id', async (req, res)=>{
    const citas = await CitasModel.findOneAndDelete(req.params.id)
    if(!citas){
        return res.status(404).send('Registro no encontrado');
    }
    res.status(200).send('La cita ha sido eliminada');
});

module.exports = router;