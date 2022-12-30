import mongoose, { Document, Schema } from "mongoose";
import mongoose_fuzzy_searching, { MongoosePluginModel } from "@imranbarbhuiya/mongoose-fuzzy-searching";
import uniqueValidator from "mongoose-unique-validator";
import Lesson from "./Lesson";
import Rating from "./Rating";
import { getVideoThumbnailUrl, isValidVideoLink } from "../services/videoServices";

export enum CourseStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    CLOSED = "closed"
}

export interface ICourse {
    title: string;
    description: string;
    instructor: mongoose.Types.ObjectId;
    subject: string;
    price: number;
    averageRating: number;
    ratings: Array<mongoose.Types.ObjectId>;
    totalHours: number;
    enrollmentsCount: number;
    activePromotion?: mongoose.Types.ObjectId;
    preview: string;
    thumbnail: string;
    lessons: Array<mongoose.Types.ObjectId>;
    isFree: boolean;
    status: CourseStatus;

    close(): Promise<void>;
    publish(): Promise<void>;
    reOpen(): Promise<void>;
}

export interface ICourseModel extends ICourse, Document {}

const courseSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        instructor: { type: mongoose.Types.ObjectId, ref: "Instructor", required: true },
        subject: { type: String, required: true, lowercase: true },
        price: { type: Number, required: true, min: 0 },
        averageRating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        ratings: [{ type: mongoose.Types.ObjectId, ref: "Rating", default: [] }],
        totalHours: {
            type: Number,
            default: 10
        },
        enrollmentsCount: { type: Number, default: 0 },
        discount: { type: Number, min: 0, max: 100, default: 0 },
        activePromotion: { type: mongoose.Types.ObjectId, ref: "Promotion", default: null },
        preview: {
            type: String,
            validate: {
                validator: isValidVideoLink,
                message: "Invalid URL, must be a valid YouTube link"
            }
        },
        lessons: [{ type: mongoose.Types.ObjectId, ref: "Lesson", default: [] }],
        status: {
            type: String,
            enum: Object.values(CourseStatus),
            default: CourseStatus.DRAFT
        }
    },
    {
        timestamps: true
    }
);

courseSchema.virtual("thumbnail").get(function (this: ICourseModel) {
    return getVideoThumbnailUrl(this.preview);
});

courseSchema.methods.close = async function (this: ICourseModel) {
    if (this.status !== CourseStatus.PUBLISHED) {
        throw new Error("Invalid Transition, course must be published to be closed");
    }
    this.status = CourseStatus.CLOSED;
    await this.save();
};

courseSchema.methods.publish = async function (this: ICourseModel) {
    if (this.status !== CourseStatus.DRAFT) {
        throw new Error("Invalid Transition, course must be draft to be published");
    }
    this.status = CourseStatus.PUBLISHED;
    await this.save();
};

courseSchema.methods.reOpen = async function (this: ICourseModel) {
    if (this.status !== CourseStatus.CLOSED) {
        throw new Error("Invalid Transition, course must be closed to be re-opened");
    }
    this.status = CourseStatus.PUBLISHED;
    await this.save();
};

courseSchema.plugin(uniqueValidator, { message: "is already taken." });
courseSchema.plugin(mongoose_fuzzy_searching, {
    fields: [
        {
            name: "title",
            minSize: 3,
            prefixOnly: true
        },
        {
            name: "subject",
            minSize: 3,
            prefixOnly: true
        }
    ]
});

// FIXME: updating a lesson should update the total hours of the course (Also for ratings)
// This doesn't right now, this just a notice of we ever need to implement this
courseSchema.pre<ICourseModel>("save", async function (next) {
    const course = this as ICourseModel;
    const lessons = await Lesson.find({ _id: { $in: course.lessons } });
    const ratings = await Rating.find({ _id: { $in: course.ratings } });
    course.totalHours = lessons.reduce((acc, lesson) => acc + lesson.totalHours, 0);
    if (ratings.length == 0) {
        course.averageRating = 0;
    } else {
        course.averageRating = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;
    }
    next();
});

courseSchema.post("findOneAndUpdate", async function () {
    const courseId = this.getQuery()["_id"] as mongoose.Types.ObjectId;
    const course = await this.model.findById(courseId);
    const lessons = await Lesson.find({ _id: { $in: course.lessons } });
    const ratings = await Rating.find({ _id: { $in: course.ratings } });
    course.totalHours = lessons.reduce((acc, lesson) => acc + lesson.totalHours, 0);
    if (ratings.length == 0) {
        course.averageRating = 0;
    } else {
        course.averageRating = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;
    }
    await course.save();
});

export default mongoose.model<ICourseModel>("Course", courseSchema) as MongoosePluginModel<ICourseModel>;
