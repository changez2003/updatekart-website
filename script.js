// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
const API = "https://updatekart-website.onrender.com";

let allPosts = [];

fetch(`${API}/posts`)
  .then(res => res.json())
  .then(data => {
    allPosts = data.reverse();
    renderPosts(allPosts);
    renderSlider(allPosts.filter(p => p.featured));
  });

function renderPosts(posts) {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(p => {
    container.innerHTML += `
      <div class="post-card">
        ${p.image ? `<img src="${p.image}" />` : ""}
        <h3>${p.titleEn}</h3>
        <p>${p.contentEn}</p>
        <hr>
        <h4>${p.titleHi}</h4>
        <p>${p.contentHi}</p>
        <span class="badge">${p.category}</span>
        ${p.views > 50 ? `<span class="trending">🔥 Trending</span>` : ""}
      </div>
    `;
  });
}

function renderSlider(posts) {
  const slider = document.getElementById("featuredSlides");
  slider.innerHTML = "";

  posts.forEach(p => {
    slider.innerHTML += `
      <div class="slide" style="background-image:url('${p.image || ""}')">
        <h2>${p.titleEn}</h2>
      </div>
    `;
  });
}

/* SEARCH */
document.getElementById("searchInput").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  renderPosts(allPosts.filter(p => p.titleEn.toLowerCase().includes(q)));
});

/* CATEGORY */
function filterCategory(cat) {
  if (cat === "All") return renderPosts(allPosts);
  renderPosts(allPosts.filter(p => p.category === cat));
}

/* DARK MODE */
function toggleDark() {
  document.body.classList.toggle("dark");
}

