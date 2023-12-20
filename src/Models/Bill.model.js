const mongoose = require("mongoose");
const { STATUS_BILL, ZERO } = require("../Constants");
const Schema = mongoose.Schema;

const BillSchema = new Schema(
  {
    total: {
      type: Number,
      trim: true,
      required: true,
      default: ZERO,
    },
    sale_staff: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sale_date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    status: {
      type: String,
      trim: true,
      enum: Object.values(STATUS_BILL),
    },
    note: {
      type: String,
      trim: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bill", BillSchema);
