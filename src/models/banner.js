import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  banner: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model("banner", bannerSchema);
