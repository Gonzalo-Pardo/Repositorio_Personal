const { Router } = require("express");
const usuarioRoutes = require("./usuario");
const exchangeRoutes = require("./exchange");

const router = Router();

router.get("/", (_req, res) => res.send("Tarea 1 Primer servicio web"));
router.use("/usuario", usuarioRoutes);   // ✅ aquí
router.use("/exchange", exchangeRoutes);

module.exports = router;
