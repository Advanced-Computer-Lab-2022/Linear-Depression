import mongoose, { Document } from "mongoose";

export interface IRating {
  comment: string;
  rating: number;
  traineeID: mongoose.Types.ObjectId;
}

export interface IRatingModel extends IRating, Document {}

const ratingSchema = new mongoose.Schema({
  comment: { type: String },
  rating: { type: Number, required: true },
  traineeID: {
    type: mongoose.Schema.Types.ObjectId
    // ref: "Trainee" Fix Me
  }
});

export default mongoose.model<IRatingModel>("Rating", ratingSchema);
