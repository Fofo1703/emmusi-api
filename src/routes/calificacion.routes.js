import { Router } from "express";
const router = Router();
import { getCalificaciones, getCalificacion, insertCalificacion, updateCalificacion, deleteCalificacion } from "../controllers/calificaciones.controller";

router.get("/getCalificaciones", getCalificaciones);
router.get("/getCalificacion/:id", getCalificacion);
router.post("/insertCalificacion", insertCalificacion);
router.put("/updateCalificacion/:id", updateCalificacion);
router.delete("/deleteCalificacion/:id", deleteCalificacion);

module.exports.routes = router;