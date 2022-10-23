import mongoose, { Document, Schema } from "mongoose";
import User, { IUser } from "./User";

const options = { discriminatorKey: "kind" };

export interface IAdmin extends IUser {}

export interface IAdminModel extends IAdmin, Document {}

const Admin = User.discriminator("Admin", new Schema({}, options));

export default Admin;
