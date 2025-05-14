import { Router } from "express";
const router = Router();
import { getProfesores, getProfesor, insertProfesor, updateProfesor, deleteProfesor } from "../controllers/profesores.controller";

router.get("/getProfesores", getProfesores);
router.get("/getProfesor/:id", getProfesor);
router.post("/insertProfesor", insertProfesor);
router.put("/updateProfesor/:id", updateProfesor);
router.delete("/deleteProfesor/:id", deleteProfesor);

module.exports.routes = router;