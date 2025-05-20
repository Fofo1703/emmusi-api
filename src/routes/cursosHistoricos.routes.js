import { Router } from "express";
const router = Router();
import { getCursosHistoricos, getCursoHistorico, insertCursoHistorico, updateCursoHistorico, deleteCursoHistorico } from "../controllers/cursosHistoricos.controller";

router.get("/getCursosHistoricos", getCursosHistoricos);
router.get("/getCursoHistorico/:id", getCursoHistorico);
router.post("/insertCursoHistorico/:id", insertCursoHistorico);
router.put("/updateCursoHistorico/:id", updateCursoHistorico);
router.delete("/deleteCursoHistorico/:id", deleteCursoHistorico);

module.exports.routes = router;