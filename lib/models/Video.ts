import mongoose from "mongoose"

const VideoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, enum: ["file", "youtube"], required: true },
  url: { type: String, required: true },
  location: { type: String, enum: ["homepage", "about", "products"], required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.Video || mongoose.model("Video", VideoSchema)
