const mongoose = require("mongoose");

//Creating a schema
const PaymentKeys = {
  TOPAY: "toPay",
  PAID: "Paid",
};

const PaymentSchema = mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Services" },
  amount: { type: Number, required: true },
  date: {
    type: Date,
    default: Date.now(),
  },
  paymentType: {
    type: String,
    default: PaymentKeys.TOPAY,
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
