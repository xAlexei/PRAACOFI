const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');

const citas = require('./routes/Citas');
const user = require('./routes/Usuarios');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/citas', citas);
app.use('/ai/usuarios',user);

//Puerto

app.listen(3000, ()=>{
    console.log("El servidor esta inicializado en el puerto 3000");
});

//Conexion

mongoose.connect('',{useNewUrlParser:true,useUnifiedTopology: true, useFindAndModify: false, useCreateIndex:true})
.then(()=>console.log('Conectado'))
.catch(()=>console.log('No se pudo establecer la conexion'));


