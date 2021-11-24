// ===========================
// Puerto
// ===========================

process.env.PORT = process.env.PORT || 4200;

// ===========================
// Entorno
// ===========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========================
// BASE DE DATOS
// ===========================

let urlDB = "mongodb+srv://xAlexei:Palacios12@cluster0.66sqe.mongodb.net/universidad?retryWrites=true&w=majority";

if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb+srv://xAlexei:Palacios12@cluster0.66sqe.mongodb.net/universidad?retryWrites=true&w=majority";
} else {
    urlDB = ""
};

process.env.URLDB = urlDB;


// ===========================
// Vencimiento de token
// ===========================

process.env.CADUCIDAD_TOKEN = '48h';

// ===========================
// SEED de autenticación
// ===========================

process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION || 'este-es-el-seed-desarrollo';


