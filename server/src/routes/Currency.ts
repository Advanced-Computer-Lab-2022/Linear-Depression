import express from "express";

import controller from "../controllers/Currency";

const router = express.Router();

router.get("/", controller.getCountry);
router.post("/:country", controller.setCountry);

export default router;
