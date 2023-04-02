import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "users"
    },
    name: {
      type: String,
      required: true,
    },
    boid: {
      type: String,
      required: true,
      unique: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    crnNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export default mongoose.model("accounts", accountSchema);