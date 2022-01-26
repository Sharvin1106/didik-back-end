const mongoose = require("mongoose");

//Creating a schema
const PaymentKeys = {
  TOPAY: "toPay",
  PAID: "Paid",
};

const PaymentSchema = mongoose.Schema({
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Services" }],
  amount: { type: Number, required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  date: {
    type: Date,
    default: Date.now(),
  },
  paymentLink: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    default: PaymentKeys.TOPAY,
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
