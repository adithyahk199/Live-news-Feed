import { fetchTopNews, searchNews } from "./api.js";
import { displayNews } from "./ui.js";
import { showLoader, hideLoader } from "./helpers.js";

export function setupEvents(elements) {

    const {
        loader,
        newsContainer,
        errorDiv,
        searchBtn,
        searchInput,
        categorySelect
    } = elements;

    async function loadNews(category = "general") {

        try {

            showLoader(loader);

            const articles = await fetchTopNews(category);

            displayNews(newsContainer, articles);

        } catch (err) {

            errorDiv.textContent = err.message;

        } finally {

            hideLoader(loader);

        }
    }

    searchBtn.addEventListener("click", async () => {

        const query = searchInput.value.trim();

        if (!query) return;

        try {

            showLoader(loader);

            const articles = await searchNews(query);

            displayNews(newsContainer, articles);

        } catch (err) {

            errorDiv.textContent = err.message;

        } finally {

            hideLoader(loader);

        }

    });

    searchInput.addEventListener("keypress", e => {

        if (e.key === "Enter") {
            searchBtn.click();
        }

    });

    categorySelect.addEventListener("change", () => {
        loadNews(categorySelect.value);
    });

    loadNews();
}
