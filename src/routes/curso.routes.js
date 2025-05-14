import { Router } from "express";
const router = Router();
import { getCursos, getCurso, insertCursos, updateCursos, deleteCursos } from "../controllers/cursos.controller";

router.get("/getCursos", getCursos);
router.get("/getCurso/:id", getCurso);
router.post("/insertCurso", insertCursos);
router.put("/updateCurso/:id", updateCursos);
router.delete("/deleteCurso/:id", deleteCursos);

module.exports.routes = router;