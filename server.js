require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const Post = mongoose.model("Post", {
  titleEn: String,
  contentEn: String,
  titleHi: String,
  contentHi: String,
  date: { type: Date, default: Date.now }
});

app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});

app.post("/add", async (req, res) => {
  await Post.create(req.body);
  res.json({ message: "Post added" });
});

app.get("/", (req, res) => {
  res.send("UpdateKart Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
