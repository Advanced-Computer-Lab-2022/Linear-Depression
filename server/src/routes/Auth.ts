import express from "express";
import Controller from "../controllers/Auth";

const router = express.Router();

router.post("/login", Controller.login);
router.get("/role", Controller.getRole);

export default router;
