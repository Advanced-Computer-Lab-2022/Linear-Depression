import { getUserType } from "../controllers/UserType";
import express from "express";

const router = express.Router();

router.get("/", getUserType);

export default router;
