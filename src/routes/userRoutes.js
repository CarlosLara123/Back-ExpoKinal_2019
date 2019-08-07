'use strict'

var express = require('express');
var UserController = require('../controllers/userController');
var CharlaController = require('../controllers/conferenciaController');
var CorreoController = require('../controllers/correoController');
var carrouselController = require('../controllers/carrouselController');
var TextoController = require('../controllers/textoController');
var historiaController = require('../controllers/historiaController');
var conferencistaController = require('../controllers/conferencistaController');
var md_auth = require('../middlewares/autheticated');


//SUBIR IMAGEN
var multiparty = require('connect-multiparty');
var md_subir = multiparty({ uploadDir: './src/uploads/users' })
var md_subir_conferenciastas = multiparty({ uploadDir: './src/uploads/conferencistas' })
var md_subir_historia = multiparty({ uploadDir: './src/uploads/historia' })
var md_subir_entrada = multiparty({ uploadDir: './src/uploads/entradas' })
var md_subir_carrousel = multiparty({ uploadDir: './src/uploads/carrousel' })


//Rutas
var api = express.Router();
api.get('/productos', md_auth.ensureAuth, UserController.getProductos);
api.post('/producto', UserController.agregarProducto);
api.post('/productoV', md_auth.ensureAuth, UserController.agregarProductoVendidoPorUsuario);
api.put('/productoVendido/:productoId', md_auth.ensureAuth, UserController.ProductoVendido);

api.get('/ejemplo', md_auth.ensureAuth, UserController.ejemplo);
api.get('/usuario/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/usuarios', UserController.getUsers);
api.post('/registrar', UserController.registrar);
api.post('/login', UserController.login);
api.post('/subir-imagen-usuario/:id', [md_auth.ensureAuth, md_subir], UserController.subirImagen);
api.get('/obtener-imagen-usuario/:nombreImagen', UserController.obtenerImagen)
api.delete('/eliminar-usuario/:id', md_auth.ensureAuth, UserController.eliminarUsuario)
api.put('/editar-usuario/:id', md_auth.ensureAuth, UserController.editarUsuario)
api.put('/editar-contrasena/:id', md_auth.ensureAuth, UserController.restaurarContrasena)
api.put('/email/:correo/:codigo', UserController.verificarEmail)

//CONFERENCIA
api.post('/charla/register', CharlaController.registrarCharla);
api.put('/charla/edit/:id', CharlaController.editarCharla);
api.put('/charla/occupy/:id', md_auth.ensureAuth, CharlaController.ocuparAsiento);
api.put('/charla/unoccupy/:id', md_auth.ensureAuth, CharlaController.cancelarEntrada);
api.put('/charla/check/:id', md_auth.ensureAuth, CharlaController.confirmarEntrada);
api.get('/charla/:id', md_auth.ensureAuth,CharlaController.misConferencias);
api.get('/charlas', CharlaController.listarCharlas);
api.get('/charla/search/:id', CharlaController.buscarId);
api.get('/charla/noti/:id', CharlaController.notificacion);
api.delete('/charla/delete/:id', CharlaController.eliminarCharla);

//CARROUSEL
api.post('/registrar-carrousel', carrouselController.registrarcarrousel);
api.put('/editar-carrousel/:id', md_auth.ensureAuth,carrouselController.editarcarrousel);
api.get('/listar-carrousels', carrouselController.listarcarrousels);
api.delete('/eliminar-carrousel/:id', md_auth.ensureAuth,carrouselController.eliminarcarrousel);
api.post('/subir-imagen-carrousel/:id',[md_auth.ensureAuth, md_subir_carrousel] ,carrouselController.subirImagen);
api.get('/obtener-imagen-carrousel/:imageFile', carrouselController.getImageFile);

//CONFERENCISTAS/COMUNICADORES
api.post('/conferencista/agregar',conferencistaController.addConferencista);
api.put('/conferencista/editar/:id',md_auth.ensureAuth,conferencistaController.editConferencista);
api.post('/conferencista/red/:id/:url/:redSocial',conferencistaController.addRed);
api.delete('/conferencista/eliminar/:id', md_auth.ensureAuth,conferencistaController.deleteConferencista);
api.get('/conferencista/getAll', conferencistaController.listarComunicadores);
api.get('/conferencista/get/:id', conferencistaController.listarComunicador);
api.post('/subir-imagen-conferencista/', [md_auth.ensureAuth, md_subir_conferenciastas] ,conferencistaController.subirImagen)
api.get('/obtener-imagen-conferencista/:imageFile', conferencistaController.getImageFile);

//TEXTO
api.post('/agregar-entrada',TextoController.agregarTexto);
api.delete('/eliminar-entrada/:id', md_auth.ensureAuth,TextoController.eliminarTexto);
api.put('/editar-entrada/:id', md_auth.ensureAuth,TextoController.editarTexto);
api.get('/listar-entradas',TextoController.listarTexto);
api.get('/buscar-entrada/:titulo',md_auth.ensureAuth,TextoController.buscarTexto);
api.get('/obtener-imagen-entrada/:imageFile', TextoController.getImageFile);
api.post('/subir-imagen-entrada/:id', [md_auth.ensureAuth, md_subir_entrada] ,TextoController.subirImagen)

//HISTORIA
api.post('/agregar-historia',historiaController.addHistoria);
api.delete('/eliminar-historia/:id',md_auth.ensureAuth,historiaController.deleteHistoria);
api.put('/editar-historia/:id',md_auth.ensureAuth,historiaController.editHistoria);
api.get('/listar-historia',historiaController.listarHistorias);
api.get('/historia/:id',md_auth.ensureAuth,historiaController.buscarHistoria);
api.get('/obtener-imagen-historia/:imageFile', historiaController.getImageFile);
api.post('/subir-imagen-historia/:id', [md_auth.ensureAuth, md_subir_historia] ,historiaController.subirImagen)

//CORREO
api.post('/correo', md_auth.ensureAuth, CorreoController.correoRestablecerPassword);
api.post('/correo/:hora/:minutos', CharlaController.lanzarSiempreALaHora);

module.exports = api;