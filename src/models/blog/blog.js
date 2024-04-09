import mongoose, { Mongoose } from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "auth",
      required: [false, "Created by field is required"],
    },
    banner: {
      type: String,
      required: [true, "Banner image is required!!"],
    },
    topic: { type: String, required: ["Topic is required!!"] },
    description: {
      type: String,
      required: [true, "Blog description is required!!"],
    },

    views: {
      count: { type: Number, default: 0 },
    },

    comments: {
      type: [
        {
          createdBy: { type: mongoose.Types.ObjectId, ref: "auth" },
          comment: { type: String },
        },
      ],
    },
  },

  { timestamps: true }
);

export default mongoose.model("blog", blogSchema);
