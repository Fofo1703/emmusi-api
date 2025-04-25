import { Router } from "express";
const router = Router();
import { getAusencias, insertAusencia, updateAusencia, deleteAusencia } from "../controllers/ausencias.controller";

router.get("/getAusencias", getAusencias);
router.post("/insertAusencia", insertAusencia);
router.put("/updateAusencia", updateAusencia);
router.delete("/deleteAusencia/:id", deleteAusencia);

module.exports.routes = router;