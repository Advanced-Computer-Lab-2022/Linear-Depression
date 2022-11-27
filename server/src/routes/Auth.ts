import express from "express";
import Controller from "../controllers/Auth";

const router = express.Router();

router.post("/login", Controller.login);

export default router;
