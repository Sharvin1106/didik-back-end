import { Schema, Document, model } from "mongoose";
import { SectionDocument } from "./section";
import { ServiceDocument } from "./service";
import { UserDocument } from "./user";

//Creating a schema
export interface DashboardDocument extends Document {
  course: ServiceDocument["_id"] | ServiceDocument;
  student: UserDocument["_id"] | UserDocument;
  tutor: UserDocument["_id"] | UserDocument;
  message: string;
  sections: SectionDocument["_id"][] | SectionDocument[];
  date: string;
}

const dashboardSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "Services" },
  student: { type: Schema.Types.ObjectId, ref: "Users" },
  tutor: { type: Schema.Types.ObjectId, ref: "Users" },
  message: { type: Schema.Types.String },
  sections: [{ type: Schema.Types.ObjectId, ref: "Sections" }],
  date: {
    type: Schema.Types.Date,
    default: Date.now(),
  },
});

export const DashboardModel = model<DashboardDocument>(
  "Dashboard",
  dashboardSchema
);
