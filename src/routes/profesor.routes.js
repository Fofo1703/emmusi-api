import { Router } from "express";
const router = Router();
import { getProfesores, insertProfesor, updateProfesor, deleteProfesor } from "../controllers/profesores.controller";

router.get("/getProfesores", getProfesores);
router.post("/insertProfesor", insertProfesor);
router.put("/updateProfesor", updateProfesor);
router.delete("/deleteProfesor/:id", deleteProfesor);

module.exports.routes = router;