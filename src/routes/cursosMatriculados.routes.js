import { Router } from "express";
const router = Router();
import { getCursosMatriculados, insertCursoMatriculado, updateCursoMatriculado, deleteCursoMatriculado } from "../controllers/cursosMatriculados.controller";

router.get("/getCursosMatriculados", getCursosMatriculados);
router.post("/insertCursoMatriculado", insertCursoMatriculado);
router.put("/updateCursoMatriculado/:id", updateCursoMatriculado);
router.delete("/deleteCursoMatriculado/:id", deleteCursoMatriculado);

module.exports.routes = router;