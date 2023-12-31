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
    quantity_in_stock: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    receipt_id: {
      type: Schema.Types.ObjectId,
      ref: "Receipts",
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ReceiptDetail", ReceiptDetailSchema);
