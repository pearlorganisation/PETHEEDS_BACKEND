import mongoose from "mongoose";
const blogCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "category is required!!"],
      unique: [true, "Category  already exists!!"],
    },
  },
  { timestamps: true }
);
export default mongoose.model(
  "blogCategory",
  blogCategorySchema,
  "blogCategory"
);
