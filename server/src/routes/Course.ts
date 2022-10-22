import express from "express";
import controller from "../controllers/Course";

const router = express.Router();

router.get("/", controller.readAll);
router.post("/", controller.createCourse);

export = router;
