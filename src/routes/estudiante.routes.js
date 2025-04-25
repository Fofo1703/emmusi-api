import { Router } from "express";
const router = Router();
import { getEstudiantes, insertEstudiante, updateEstudiante, deleteEstudiante } from "../controllers/estudiantes.controller";

router.get("/getEstudiantes", getEstudiantes);
router.post("/insertEstudiante", insertEstudiante);
router.put("/updateEstudiante", updateEstudiante);
router.delete("/deleteEstudiante/:id", deleteEstudiante);

module.exports.routes = router;