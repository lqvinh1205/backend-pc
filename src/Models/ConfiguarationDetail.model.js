const mongoose = require("mongoose");
const { ZERO } = require("../Constants");
const Schema = mongoose.Schema;

const ConfiguarationDetailSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    value: {
      type: String,
      trim: true,
      required: true,
    },
    value: {
      type: String,
      trim: true,
      required: true,
    },
    configuaration_id: {
      type: Schema.Types.ObjectId,
      ref: "Configuaration",
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "ConfiguarationDetail",
  ConfiguarationDetailSchema
);
