const mongoose = require("mongoose");
const { ZERO } = require("../Constants");
const Schema = mongoose.Schema;

const ReceiptDetailSchema = new Schema(
  {
    quantity: {
      type: Number,
      trim: true,
      required: true,
    },
    receipt_id: {
      type: Schema.Types.ObjectId,
      ref: "Receipt",
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ReceiptDetail", ReceiptDetailSchema);
