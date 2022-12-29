import express from "express";
import reportController from "../controllers/Report";

const router = express.Router();

router.get("/:threadId", reportController.getThread);
router.post("/:threadId", reportController.addThreadReply);

export default router;
