require('dotenv').config();
const express = require('express');
const app = express(); // <--- crea una nueva aplicacion express en la variable app


//* Para poder utilizar el modulo del mongoose:

const mongoose = require('mongoose');

(async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('te has conectado a mongoDB')
    }catch(error){
        console.log(error);
    }
})()



//* Ahora debemos iniciar nuestro servidor:

module.exports = app;