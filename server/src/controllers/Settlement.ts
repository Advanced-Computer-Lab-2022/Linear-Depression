import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

import Settlement from "../models/Settlement";
import { settlementMonthMapper } from "../services/SettlementService";

const listSettlements = async (req: Request, res: Response, next: NextFunction) => {
    const instructorId = req.body.userId as unknown as mongoose.Types.ObjectId;

    const settlements = await Settlement.find({ instructorId }).sort({ createdAt: -1 });
    console.log(settlements);

    const settlementMonthMap = settlementMonthMapper(settlements);

    return res.status(StatusCodes.OK).json(settlementMonthMap);
};

export default { listSettlements };
