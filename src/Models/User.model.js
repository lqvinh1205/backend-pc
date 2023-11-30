const mongoose = require("mongoose");
const { ROLES } = require("../Constants");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
      select: false,
    },
    phone_number: {
      type: String,
      trim: true,
      unique: true,
    },
    date_of_birth: {
      type: Date,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    refresh_token: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      trim: true,
      required: true,
      default: ROLES["customer"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Users", UserSchema);

// {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Room",
// },
