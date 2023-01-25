
const { Router } = require('express');
const router = Router();

const { 
    nuevoUsuario,
    loginUsuario,
    mostrarUsuario
} = require('../controllers/appcontroller');



router.post("/usuarios", nuevoUsuario);
router.post("/login", loginUsuario);
router.get("/usuarios", mostrarUsuario);



module.exports = router;