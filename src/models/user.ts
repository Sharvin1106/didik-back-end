import { Schema, Document, model } from "mongoose";
import { Role } from "../vars/roles";
import { DashboardDocument } from "./dashboard";
import { ServiceDocument } from "./service";

//Creating a schema
export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  emailAddress: string;
  uid: string;
  role: Role;
  description: string;
  age: Number;
  dashboard: DashboardDocument["_id"] | DashboardDocument;
  courses: ServiceDocument["_id"] | ServiceDocument;
  profilePic: string;
}

const userSchema = new Schema({
  firstName: {
    type: Schema.Types.String,
    required: true,
  },
  lastName: {
    type: Schema.Types.String,
    required: true,
  },
  emailAddress: {
    type: Schema.Types.String,
    required: true,
  },
  uid: {
    type: Schema.Types.String,
    required: true,
  },
  role: {
    type: Schema.Types.String,
    enum: Object.values(Role),
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  age: {
    type: Schema.Types.Number,
    required: true,
  },
  dashboard: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dashboard",
    },
  ],
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Services",
    },
  ],
  profilePic: { type: Schema.Types.String, required: false },
});

export const UserModel = model<UserDocument>("Users", userSchema);
