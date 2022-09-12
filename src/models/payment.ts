import { Schema, model, Document } from "mongoose";
import { PaymentKeys } from "../vars/payment";
import { ServiceDocument } from "./service";
import { UserDocument } from "./user";

//Creating a schema
export interface PaymentDocument extends Document {
  courses: ServiceDocument["_id"] | ServiceDocument;
  amount: number;
  student: UserDocument["_id"] | UserDocument;
  date: string;
  paymentLink: string;
  paymentType: PaymentKeys;
}

const paymentSchema = new Schema({
  courses: [{ type: Schema.Types.ObjectId, ref: "Services" }],
  amount: { type: Schema.Types.Number, required: true },
  student: { type: Schema.Types.ObjectId, ref: "Users" },
  date: {
    type: Schema.Types.Date,
    default: Date.now(),
  },
  paymentLink: {
    type: Schema.Types.String,
    required: true,
  },
  paymentType: {
    type: Schema.Types.String,
    enum: Object.keys(PaymentKeys),
    default: PaymentKeys.TOPAY,
  },
});

export const PaymentModel = model<PaymentDocument>("Payment", paymentSchema);
