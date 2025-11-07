// server/routes/gallery.js
import express from "express";
import cloudinary from "../lib/cloudinary.js";

const router = express.Router();

// Simple in-memory cache to reduce Cloudinary calls
const cache = {};
const CACHE_TTL_MS = 1000 * 60 * 2; // 2 minutes

/**
 * GET /gallery/:service
 * Example: /gallery/wedding
 */
router.get("/:service", async (req, res) => {
  const service = req.params.service;
  if (!service) return res.status(400).json({ success: false, message: "Service required" });

  const folder = `${service}`; // make sure Cloudinary folder names match this

  // Serve from cache if fresh
  const cached = cache[folder];
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return res.json({ success: true, images: cached.images });
  }

  try {
    // Use Cloudinary Search API to list resources in folder
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by("public_id", "desc")
      .max_results(500)
      .execute();

    const images = (result.resources || []).map((r) => ({
      url: r.secure_url,
      public_id: r.public_id,
      width: r.width,
      height: r.height,
      format: r.format,
    }));

    // cache it
    cache[folder] = { ts: Date.now(), images };

    res.json({ success: true, images });
  } catch (err) {
    console.error("Cloudinary error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch images" });
  }
});

export default router;
