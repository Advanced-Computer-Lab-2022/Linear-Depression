import express from "express";
import controller from "../controllers/CorporateTrainee";

const router = express.Router();

router.get("/", controller.listCorporateTrainees);
router.post("/", controller.createCorporateTrainee);
router.get("/:corporateTraineeId", controller.readCorporateTrainee);
router.put("/:corporateTraineeId", controller.updateCorporateTrainee);
router.delete("/:corporateTraineeId", controller.deleteCorporateTrainee);

export default router;
