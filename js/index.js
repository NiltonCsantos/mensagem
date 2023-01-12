function redenrArticle(articleData) {
  const article = document.createElement("article");

  const h4 = document.createElement("h4");
  h4.textContent = articleData.author;

  const p = document.createElement("p");

  p.textContent = articleData.content;

  article.append(h4, p);
  document.getElementById("articles").append(article);
}

async function fetchArticles() {
  const articles = await fetch(" http://localhost:3000/articles").then(
    (result) => result.json()
  );
  articles.forEach(redenrArticle);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchArticles();
});

const form = document.querySelector("form");

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const articleData = {
    author: document.getElementById("author").value,
    content: document.getElementById("content").value
  };

  const response = await fetch(" http://localhost:3000/articles", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(articleData),
  });

  const savedArticle = await response.json();
  form.reset();

  redenrArticle(savedArticle);
});
