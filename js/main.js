import { setupEvents } from "./events.js";
import { fetchTopNews } from "./api.js";

// Ensure DOM is ready before querying elements (helps when serving files or
// when the script is moved around). Also surfaces initialization errors.
document.addEventListener("DOMContentLoaded", () => {

    try {
        const elements = {
            loader: document.getElementById("loader"),
            newsContainer: document.getElementById("newsContainer"),
            errorDiv: document.getElementById("error"),

            searchBtn: document.getElementById("searchBtn"),
            searchInput: document.getElementById("searchInput"),
            categorySelect: document.getElementById("category")
        };

        setupEvents(elements);
        fetchTopNews(elements);
    } catch (err) {
        // Show initialization errors in the console for debugging
        console.error("Initialization error:", err);
    }

});