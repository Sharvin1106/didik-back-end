import { Schema, model, Document } from "mongoose";
import { DashboardDocument } from "./dashboard";

export interface SectionDocument extends Document {
  dashboard: DashboardDocument["_id"] | DashboardDocument;
  sectionTitle: string;
  sectionDesc: string;
  startTime: string;
  endTime: string;
  platform: string;
  meetingLink: string;
  notesLink: string;
  sectionDate: string;
}

const sectionSchema = new Schema({
  dashboard: { type: Schema.Types.ObjectId, ref: "Dashboard" },
  sectionTitle: {
    type: String,
    required: true,
  },
  sectionDesc: { type: Schema.Types.String, required: true },
  startTime: { type: Schema.Types.String, required: true },
  endTime: { type: Schema.Types.String, required: true },
  platform: { type: Schema.Types.String, required: true },
  meetingLink: { type: Schema.Types.String, required: true },
  notesLink: { type: Schema.Types.String, required: true },
  sectionDate: {
    type: Schema.Types.Date,
    default: Date.now(),
  },
});

export const SectionModel = model<SectionDocument>("Section", sectionSchema);
