import { Router } from "express";
const router = Router();
import { getHorarios, getHorario, insertHorario, updateHorario, deleteHorario, getHorariosPorCurso } from "../controllers/horarios.controller";

router.get("/getHorarios", getHorarios);
router.get("/getHorario/:id", getHorario);
router.post("/insertHorario", insertHorario);
router.put("/updateHorario/:id", updateHorario);
router.delete("/deleteHorario/:id", deleteHorario);
router.get("/getHorariosPorCurso/:id", getHorariosPorCurso);

module.exports.routes = router;