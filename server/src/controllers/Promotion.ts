import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import Promotion, { PromotionSource } from "../models/Promotion";
import Course from "../models/Course";
import { PromotionValidator } from "../validators/validators";

const listPromotions = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        const promotions = await Promotion.find().populate("courses");
        return res.status(StatusCodes.OK).json({ promotions });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const getPromotion = async (req: Request, res: Response, _next: NextFunction) => {
    const promotionId = req.params.promotionId;

    try {
        const promotion = await Promotion.findById(promotionId).populate("courses");
        return promotion
            ? res.status(StatusCodes.OK).json({ promotion })
            : res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const createPromotion = async (req: Request, res: Response, _next: NextFunction) => {
    const promotion = new Promotion({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    try {
        await PromotionValidator.validate(promotion);
        return promotion
            .save()
            .then(async (promotion) => {
                res.status(StatusCodes.CREATED).json({ promotion });
            })
            .catch((error) => {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
            });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
};

const updatePromotion = async (req: Request, res: Response, _next: NextFunction) => {
    const promotionId = req.params.promotionId;

    return Promotion.findById(promotionId)
        .then((promotion) => {
            if (promotion) {
                promotion.set(req.body);

                return promotion
                    .save()
                    .then((promotion) => res.status(StatusCodes.CREATED).json({ promotion }))
                    .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const deletePromotion = async (req: Request, res: Response, _next: NextFunction) => {
    const promotionId = req.params.promotionId;

    try {
        const promotion = await Promotion.findByIdAndDelete(promotionId);
        return promotion
            ? res.status(StatusCodes.OK).json({ message: "Promotion Deleted" })
            : res.status(StatusCodes.NOT_FOUND).json({ message: "Promotion Not Found" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export default {
    createPromotion,
    listPromotions,
    getPromotion,
    updatePromotion,
    deletePromotion
};
