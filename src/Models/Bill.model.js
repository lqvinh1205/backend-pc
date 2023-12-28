const mongoose = require("mongoose");
const { STATUS_BILL, ZERO } = require("../Constants");
const Schema = mongoose.Schema;

const BillSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: false,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    phone_number: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
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
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bill", BillSchema);
