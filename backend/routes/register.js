const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("./../models/usuario");
const app = express();

//Create user

app.post("/register", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  let body = req.body;
  let { nombre, email, password, role } = body;
  let usuario = new Usuario({
    nombre,
    email,
    password: bcrypt.hashSync(password, 10),
    role,
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});

//Get all users

app.get("/mostrar_usuarios", async (req, res) => {
  await Usuario.find()
    .then((result) => {
      if (!result)
        res.json({ succes: false, result: "No se encontraron registros" });

      res.json({ succes: true, result: result });
    })
    .catch((err) => res.json({ succes: false, result: err }));
});


//Get an user with specific ID

 //Get one 

 app.get('/user/:id', async (req, res)=>{
  const { id } = req.params;
  Usuario
  .findById(id)
  .then((data)=> res.json(data))
  .catch((error) => res.json({ message: error}));
});


//Delete user 

app.delete("/:id", async (req, res) => {
  const user = await Usuario.findOneAndDelete(req.params.id);
  if (!user) {
    return res.status(404).send("Registro no encontrado");
  }
  res.status(200).send("El usuario ha sido eliminado");
});

module.exports = app;
