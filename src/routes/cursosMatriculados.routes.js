import { Router } from "express";
const router = Router();
import { getCursosMatriculados, getCursoMatriculado, insertCursoMatriculado, updateCursoMatriculado, deleteCursoMatriculado } from "../controllers/cursosMatriculados.controller";

router.get("/getCursosMatriculados/:id", getCursosMatriculados);
router.get("/getCursoMatriculado/:id", getCursoMatriculado);
router.post("/insertCursoMatriculado", insertCursoMatriculado);
router.put("/updateCursoMatriculado/:id", updateCursoMatriculado);
router.delete("/deleteCursoMatriculado/:id", deleteCursoMatriculado);

module.exports.routes = router;