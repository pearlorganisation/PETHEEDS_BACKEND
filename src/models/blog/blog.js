import mongoose, { Mongoose } from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "auth",
      required: [false, "Created by field is required"],
    },
    // category: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "blogCategory",
    //   required: [true, "Blog category is required"],
    // },
    topic: { type: String, required: ["Topic is required!!"] },
    subTopics: {
      required: [true, "Sub topic is required!!"],
      type: [{ subTopic: String, description: String }],
    },
    conclusion: {
      type: String,
      required: [true, "Conclusion is required!!"],
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
