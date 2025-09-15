// src/routes/api/index.js
const { Router } = require("express");

// Subrutas
const exchangeRoutes = require("./exchange");
const usuarioRoutes = require("./usuario");
// Si usas auth, descomenta la siguiente línea y el router.use de abajo
// const authRoutes = require("./auth");

const router = Router();

// Ruta raíz (ping)
router.get("/", (req, res) => {
  res.send("Tarea 1 Primer servicio web");
});

// Montar módulos
router.use("/exchange", exchangeRoutes); // /api/exchange/...
router.use("/usuario", usuarioRoutes);   // /api/usuario/...
// router.use("/auth", authRoutes);      // /api/auth/...

module.exports = router;
