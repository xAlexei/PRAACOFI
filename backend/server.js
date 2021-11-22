require('./config/config');
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const citas = require('./routes/Citas');

app.use(express.json());
app.use(require('./routes/index')); 
app.use('/api/citas', citas);



mongoose.connect(process.env.URLDB, {
    useNewUrlParser:true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw err;
        
    console.log("Base de datos online");
});

app.listen(process.env.PORT, ()=> {
    console.log("Escuchando en puerto 3000");
});

/*Puerto
app.listen(3000, ()=>{
    console.log("El servidor esta inicializado en el puerto 3000");
});
Conexion
mongoose.connect('mongodb+srv://xAlexei:Palacios12@cluster0.66sqe.mongodb.net/PRAACOFI?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true, useFindAndModify: false, useCreateIndex:true})
.then(()=>console.log('Conectado'))
.catch(()=>console.log('No se pudo establecer la conexion'));
*/

