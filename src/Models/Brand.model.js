const mongoose = require("mongoose");
const { STATUS_BILL, ZERO } = require("../Constants");
const Schema = mongoose.Schema;

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    logo: {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Brand", BrandSchema);
