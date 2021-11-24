const express = require('express');
const bcrypt = require('bcrypt');
const Contador =  require('./../models/contador');
const app = express();

app.post('/registro_contador', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
      let body = req.body;
      let { nombre, email, password, role } = body;
      let contador = new Contador({
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        role
      });
    contador.save((err, contadorDB) => {
        if (err) {
          return res.status(400).json({
             ok: false,
             err,
          });
        }
        res.json({
              ok: true,
              contador: contadorDB
           });
        })
    });
  
    app.get('/mostrar_contadores', async(req, res)=>{
      await contador.find()
      .then(result =>{
          if(!result) res.json({ succes: false, result: 'No se encontraron registros'});
  
          res.json({ succes: true, result: result});
      }).catch(err => res.json({succes: false, result: err}));
  });
  
  
    app.delete('/:id', async (req, res)=>{
      const user = await contador.findOneAndDelete(req.params.id)
      if(!user){
          return res.status(404).send('Registro no encontrado');
      }
      res.status(200).send('El contador ha sido eliminado');
  });
  
  
    
    module.exports = app;