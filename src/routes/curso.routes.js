import { Router } from "express";
const router = Router();
import { getCursos, insertCursos, updateCursos, deleteCursos } from "../controllers/cursos.controller";

router.get("/getCursos", getCursos);
router.post("/insertCurso", insertCursos);
router.put("/updateCurso/:id", updateCursos);
router.delete("/deleteCurso/:id", deleteCursos);

module.exports.routes = router;