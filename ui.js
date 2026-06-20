export function displayNews(newsContainer, articles) {

    newsContainer.innerHTML = "";

    if (!articles.length) {
        newsContainer.innerHTML =
            `<div class="no-news">No News Found</div>`;
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
                    ${new Date(article.publishedAt).toLocaleDateString()}
                </small>

                <h3>${article.title}</h3>

                <p>${article.description || ""}</p>

                <a href="${article.url}" target="_blank">
                    Read Full Article
                </a>

            </div>
        `;

        newsContainer.appendChild(card);
    });

}
