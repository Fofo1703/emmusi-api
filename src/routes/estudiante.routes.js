import { Router } from "express";
const router = Router();
import { getEstudiantes, getEstudiante, insertEstudiante, updateEstudiante, deleteEstudiante } from "../controllers/estudiantes.controller";

router.get("/getEstudiantes", getEstudiantes);
router.get("/getEstudiante/:id", getEstudiante);
router.post("/insertEstudiante", insertEstudiante);
router.put("/updateEstudiante/:id", updateEstudiante);
router.delete("/deleteEstudiante/:id", deleteEstudiante);

module.exports.routes = router;