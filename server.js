require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ======================
   Middleware
====================== */
app.use(cors());
app.use(express.json({ limit: "2mb" }));

/* ======================
   MongoDB Connection
====================== */
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "updatekart",
  })
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

/* ======================
   Post Schema
====================== */
const PostSchema = new mongoose.Schema(
  {
    titleEn: String,
    contentEn: String,
    titleHi: String,
    contentHi: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

/* ======================
   Routes
====================== */

/* Root route */
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "UpdateKart Backend Running",
    endpoints: {
      posts: "/posts",
      add: "/add",
      health: "/health",
    },
  });
});

/* Health check */
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

/* Get all posts */
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Add new post */
app.post("/add", async (req, res) => {
  try {
    const { titleEn, contentEn, titleHi, contentHi } = req.body;

    if (!titleEn || !contentEn) {
      return res
        .status(400)
        .json({ error: "English title and content are required" });
    }

    await Post.create({
      titleEn,
      contentEn,
      titleHi,
      contentHi,
    });

    res.json({ message: "Post added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
   Server Start
====================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
