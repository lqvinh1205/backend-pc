const mongoose = require("mongoose");
const { ZERO } = require("../Constants");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    path: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Images", ImageSchema);
