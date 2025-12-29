const API = "https://updatekart-website.onrender.com";

function addPost() {
  fetch(`${API}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titleEn: titleEn.value,
      contentEn: contentEn.value,
      titleHi: titleHi.value,
      contentHi: contentHi.value,
      image: image.value,
      category: category.value,
      featured: featured.checked,
      views: 0
    })
  }).then(() => {
    alert("Post published");
    location.reload();
  });
}
