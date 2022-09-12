import { Schema, model, Document } from "mongoose";

export interface SubjectDocument extends Document {
  title: string;
  logo: String;
}

//Creating a schema

const subjectSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
  },
  logo: {
    type: Schema.Types.String,
    required: true,
  },
});

export const SubjectModel = model<SubjectDocument>("Subjects", subjectSchema);
