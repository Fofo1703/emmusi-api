import { Router } from "express";
const router = Router();
import { validarCredenciales } from "../controllers/usuarios.controller";

router.post("/validarCredenciales", validarCredenciales);


module.exports.routes = router;