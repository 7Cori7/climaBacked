const mongoose = require('mongoose');
const express = require('express');
const app = require('./app');
const http = require('http');
const server = http.createServer(app);

const path = require('path');


server.listen(3000,()=>{
    console.log('El servidor esta corriendo')
})

app.use(express.json());




//* Rutas del frontend:
app.use('/',express.static(path.resolve('Clima-backend','views','home')))