console.log("UpdateKart JS loaded");

// CHANGE THIS LATER to your Render backend URL
const API_URL = "http://localhost:5000/api/posts";

// Load posts on homepage
async function loadPosts() {
  try {
    const res = await fetch(API_URL);
    const posts = await res.json();

    const container = document.getElementById("posts");
    if (!container) return;

    container.innerHTML = "";

    posts.reverse().forEach(post => {
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <h3>${post.title}</h3>
        <small>${new Date(post.createdAt).toLocaleDateString()}</small>
        <p>${post.content}</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading posts", err);
  }
}

// Admin form submit
async function addPost(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const password = document.getElementById("password").value;

  if (password !== "admin123") {
    alert("Wrong admin password");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content })
    });

    if (res.ok) {
      alert("Post added successfully");
      document.getElementById("postForm").reset();
    } else {
      alert("Failed to add post");
    }
  } catch (err) {
    console.error("Error adding post", err);
  }
}

// Auto-load posts on homepage
document.addEventListener("DOMContentLoaded", loadPosts);
