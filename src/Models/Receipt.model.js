const mongoose = require("mongoose");
const { ZERO } = require("../Constants");
const Schema = mongoose.Schema;

const ReceiptSchema = new Schema(
  {
    code: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    import_date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    importer: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    warehouse: {
      type: String,
      trim: true,
      required: true,
    },
    deliver: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Receipts", ReceiptSchema);
