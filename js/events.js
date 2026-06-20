import { fetchTopNews, searchNews } from "./api.js";

export function setupEvents(elements) {

    const {
        searchBtn,
        searchInput,
        categorySelect
    } = elements;

    searchBtn.addEventListener("click", () => {

        const query = searchInput.value.trim();

        if (query) {
            searchNews(elements, query);
        }

    });

    searchInput.addEventListener("keypress", e => {

        if (e.key === "Enter") {
            searchBtn.click();
        }

    });

    categorySelect.addEventListener("change", () => {

        fetchTopNews(elements, categorySelect.value);

    });

}