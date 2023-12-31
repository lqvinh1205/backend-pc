const mongoose = require("mongoose");
const { ZERO } = require("../Constants");
const Schema = mongoose.Schema;

const BillDetailSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
      default: ZERO,
    },
    price: {
      type: Number,
      required: true,
      default: ZERO,
    },
    bill_id: {
      type: Schema.Types.ObjectId,
      ref: "Bill",
    },
    receipt_detail_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "ReceiptDetail",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("BillDetail", BillDetailSchema);
