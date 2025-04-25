import { Router } from "express";
const router = Router();
import { getCalificaciones, insertCalificacion, updateCalificacion, deleteCalificacion } from "../controllers/calificaciones.controller";

router.get("/getCalificaciones", getCalificaciones);
router.post("/insertCalificacion", insertCalificacion);
router.put("/updateCalificacion", updateCalificacion);
router.delete("/deleteCalificacion/:id", deleteCalificacion);

module.exports.routes = router;