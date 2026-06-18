const API_KEY = "c0a60f88111d3c180a38dcb5f873168c";


    const loader = document.getElementById('loader');
    const newsContainer = document.getElementById('newsContainer');
    const errorDiv = document.getElementById('error');

    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('category');

    function showLoader() {
        loader.style.display = 'block';
    }

    function hideLoader() {
        loader.style.display = 'none';
    }

    function getProxyUrl(apiUrl) {
        return `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;
    }

    async function fetchTopNews(category = 'general') {

        try {
            showLoader();
            errorDiv.textContent = "";
            newsContainer.innerHTML = "";
            const apiUrl = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=20&apikey=${API_KEY}`;

            const response = await fetch(getProxyUrl(apiUrl));
            const data = await response.json();
            console.log("Top News Response:", data);
            if (!response.ok) {
                throw new Error(
                    data.errors?.join(", ") ||
                    data.message ||
                    "Failed to fetch news"
                );
            }
            if (!data.articles) {
                throw new Error("No articles returned from API");
            }
            displayNews(data.articles);
        } catch (error) {
            console.error(error);
            errorDiv.textContent = error.message;
        } finally {
            hideLoader();
        }

    }

    async function searchNews(query) {

        try {
            showLoader();
            errorDiv.textContent = "";
            newsContainer.innerHTML = "";
            const apiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=20&apikey=${API_KEY}`;
                const response = await fetch(getProxyUrl(apiUrl));
            const data = await response.json();
            console.log("Search Response:", data);
            if (!response.ok) {
                throw new Error(
                    data.errors?.join(", ") ||
                    data.message ||
                    "Failed to search news"
                );
            }
            if (!data.articles) {
                throw new Error("No articles returned from API");
            }
            displayNews(data.articles);
        } catch (error) {
            console.error(error);
            errorDiv.textContent = error.message;
        } finally {
            hideLoader();
        }

    }

    function displayNews(articles) {

        newsContainer.innerHTML = "";
        if (!articles || articles.length === 0) {
            newsContainer.innerHTML = `<div class="no-news">No News Found</div>`;
            return;
        }
        articles.forEach(article => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
        <img
        src="${article.image || 'https://via.placeholder.com/400x220'}"
        alt="News Image">
        <div class="card-content">
            <small>
            ${article.source?.name || "Unknown Source"}
            •
            ${article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString()
                : "Unknown Date"}
            </small>
            <h3>${article.title || "No Title"}</h3>
            <p>
            ${article.description || "No Description Available"}
            </p>
            <a href="${article.url || '#'}" target="_blank">
                Read Full Article
            </a>
        </div>
    `;
            newsContainer.appendChild(card);
        });

    }

    searchBtn.addEventListener('click', () => {

        const query = searchInput.value.trim();
        if (query) {
            searchNews(query);
        }

    });

    searchInput.addEventListener('keypress', (e) => {

        if (e.key === "Enter") {
            searchBtn.click();
        }

    });

    categorySelect.addEventListener("change", () => {
        fetchTopNews(categorySelect.value);
    });

    window.onload = () => {
        fetchTopNews();
    };