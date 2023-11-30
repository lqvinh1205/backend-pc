const mongoose = require("mongoose");
const { ZERO } = require("../Constants");
const Schema = mongoose.Schema;

const ConfiguarationSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Configuarations", ConfiguarationSchema);
