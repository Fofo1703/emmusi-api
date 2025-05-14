import { Router } from "express";
const router = Router();
import { getHorarios, getHorario, insertHorario, updateHorario, deleteHorario } from "../controllers/horarios.controller";

router.get("/getHorarios", getHorarios);
router.get("/getHorario/:id", getHorario);
router.post("/insertHorario", insertHorario);
router.put("/updateHorario/:id", updateHorario);
router.delete("/deleteHorario/:id", deleteHorario);

module.exports.routes = router;