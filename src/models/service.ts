import { Schema, model, Document } from "mongoose";
import { CommentDocument } from "./comment";
import { UserDocument } from "./user";

//Creating a schema
export interface ServiceDocument extends Document {
  title: string;
  description: string;
  pricing: string;
  lessons: string;
  mode: string;
  medium: string;
  img: string;
  tag: string;
  tutor: UserDocument["_id"] | UserDocument;
  students: number;
  comments: CommentDocument["_id"][] | CommentDocument[];
  date: string;
}

const serviceSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  pricing: {
    type: Schema.Types.String,
    required: true,
  },
  lessons: {
    type: Schema.Types.String,
    required: true,
  },
  mode: {
    type: Schema.Types.String,
    required: true,
  },
  medium: {
    type: Schema.Types.String,
    required: true,
  },
  img: {
    type: Schema.Types.String,
    required: true,
  },
  tag: {
    type: Schema.Types.String,
  },
  tutor: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  students: {
    type: Schema.Types.Number,
    default: 0,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  date: {
    type: Schema.Types.Date,
    default: Date.now(),
  },
});

export const ServiceModel = model<ServiceDocument>("Services", serviceSchema);
