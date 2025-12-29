const API_URL = "https://updatekart-website.onrender.com";

async function loadPosts() {
  try {
    const res = await fetch(`${API_URL}/posts`);
    const posts = await res.json();

    const container = document.getElementById("posts");
    container.innerHTML = "";

    if (posts.length === 0) {
      container.innerHTML = "<p>No updates yet.</p>";
      return;
    }

    posts.forEach(post => {
      const div = document.createElement("div");
      div.className = "post-card";

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
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", loadPosts);
