var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Labos DEI' });
});

router.get('/solicitud', function(req, res, next) {
  res.render('solicitud', { title: 'Reservar laboratorio' });
});

router.get('/perfil', function(req, res, next) {
  res.render('perfil', { title: 'Reservar laboratorio' });
});

router.get('/registro', function(req, res, next) {
  res.render('registro', { title: 'Registrar nuevo usuario' });
});


router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'Opciones de administrador' });
});

module.exports=router;