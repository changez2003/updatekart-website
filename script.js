console.log("UpdateKart JS loaded");

/* BACKEND URL (LOCAL) */
const API_URL = "https://updatekart-website.onrender.com";

/* =========================
   LOAD POSTS ON HOMEPAGE
   ========================= */
async function loadPosts() {
  try {
    const res = await fetch(`${API_URL}/posts`);
    const posts = await res.json();

    const container = document.getElementById("posts");
    if (!container) return;

    container.innerHTML = "";

    posts.reverse().forEach(post => {
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <h3>${post.titleEn || ""}</h3>
        <p>${post.contentEn || ""}</p>
        <hr>
        <h4>${post.titleHi || ""}</h4>
        <p>${post.contentHi || ""}</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading posts", err);
  }
}

/* =========================
   ADD POST (ADMIN PAGE)
   ========================= */
async function addPost() {
  const titleEn = document.getElementById("te").value;
  const contentEn = document.getElementById("ce").value;
  const titleHi = document.getElementById("th").value;
  const contentHi = document.getElementById("ch").value;

  if (!titleEn || !contentEn) {
    alert("Please enter English title and content");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titleEn,
        contentEn,
        titleHi,
        contentHi
      })
    });

    if (res.ok) {
      alert("Post added successfully");
      document.getElementById("te").value = "";
      document.getElementById("ce").value = "";
      document.getElementById("th").value = "";
      document.getElementById("ch").value = "";
    } else {
      alert("Failed to add post");
    }
  } catch (err) {
    console.error("Error adding post", err);
  }
}

/* =========================
   AUTO LOAD POSTS
   ========================= */
document.addEventListener("DOMContentLoaded", loadPosts);
