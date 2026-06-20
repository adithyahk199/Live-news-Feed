export function displayNews(newsContainer, articles) {

    newsContainer.innerHTML = "";

    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = `<div class="no-news">No News Found</div>`;
        return;
    }

    articles.forEach(article => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${article.image || "https://via.placeholder.com/400x220"}">

            <div class="card-content">

                <small>
                    ${article.source?.name || "Unknown Source"}
                    •
                    ${article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString()
                        : "Unknown Date"}
                </small>

                <h3>${article.title}</h3>

                <p>${article.description || "No Description Available"}</p>

                <a href="${article.url}" target="_blank">
                    Read Full Article
                </a>

            </div>
        `;

        newsContainer.appendChild(card);
    });

}