import express from "express";
import controller from "../controllers/Course";

const router = express.Router();

router.post("/", controller.createCourse);

export = router;
