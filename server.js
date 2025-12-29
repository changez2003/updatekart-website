require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ======================
   Middleware
   ====================== */
app.use(cors());
app.use(express.json());

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
const PostSchema = new mongoose.Schema({
  titleEn: String,
  contentEn: String,
  titleHi: String,
  contentHi: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", PostSchema);

/* ======================
   Routes
   ====================== */

// Test route
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "UpdateKart Backend Running",
    endpoints: {
      posts: "/posts",
      add: "/add"
    }
  });
});


// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new post
app.post("/add", async (req, res) => {
  try {
    await Post.create(req.body);
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
  console.log("Server running on port", PORT);
});
