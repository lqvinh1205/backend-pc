const mongoose = require("mongoose");
const { STATUS_BILL, ZERO, WARRANTY_UNIT } = require("../Constants");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    price_root: {
      type: Number,
      trim: true,
      default: ZERO,
    },
    discount: {
      type: Number,
      trim: true,
      default: ZERO,
    },
    price: {
      type: Number,
      trim: true,
      default: ZERO,
    },
    description: {
      type: String,
      trim: true,
    },
    quantity_in_stock: {
      type: Number,
      trim: true,
      default: ZERO,
    },
    warranty_time: {
      type: Number,
      trim: true,
      required: true,
    },
    warranty_unit: {
      type: String,
      enum: WARRANTY_UNIT,
      default: WARRANTY_UNIT[0],
    },
    warranty_house: {
      type: String,
      trim: true,
      required: true,
    },
    images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
    thumbnail: { type: Schema.Types.ObjectId, ref: "Image" },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    supplier: {
      type: String,
      trim: true,
      required: true,
    },
    brand_id: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Products", ProductSchema);
