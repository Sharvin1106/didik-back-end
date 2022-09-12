import { Schema, Document, model } from "mongoose";

export interface CommentDocument extends Document {
  message: string;
  rating: string;

}

const commentSchema = new Schema({
  message: {
    type: Schema.Types.String,
    required: true,
  },
  rating: {
    type: Schema.Types.String,
    required: true,
  },
  course: { type: Schema.Types.ObjectId, ref: "Services" },
  student: { type: Schema.Types.ObjectId, ref: "Users" },
  date: {
    type: Schema.Types.Date,
    default: Date.now(),
  },
});

export const CommentModel = model<CommentDocument>("Comment", commentSchema);
