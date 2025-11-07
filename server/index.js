import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("Cloudinary Config:", {
  name: process.env.CLOUD_NAME,
  key: process.env.API_KEY ? "✅ Loaded" : "❌ Missing",
  secret: process.env.API_SECRET ? "✅ Loaded" : "❌ Missing",
});
// Cloudinary setup
cloudinary.config({
  
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// API route to fetch gallery
app.get("/api/gallery/:folder", async (req, res) => {
  try {
    const { folder } = req.params;
    console.log("Fetching images from folder:", folder);

    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by("public_id", "desc")
      .max_results(50)
      .execute();

    console.log("Found resources:", result.resources.length);

    const images = result.resources.map((img) => img.secure_url);
    res.json({ images });
  } catch (err) {
    console.error("Error fetching gallery:", err);
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
