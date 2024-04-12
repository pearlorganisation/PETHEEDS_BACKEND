import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  banner: { type: {}, required: true },
  title: { type: String, required: true },

});

export default mongoose.model("banner", bannerSchema);
