import { API_KEY } from "./config.js";
import { showLoader, hideLoader, getProxyUrl } from "./utils.js";
import { displayNews } from "./ui.js";

export async function fetchTopNews(elements, category = "general") {

    const { loader, errorDiv, newsContainer } = elements;

    // Helpful guard: avoid making requests with the placeholder API key.
    if (!API_KEY || API_KEY === "YOUR_API_KEY") {
        const msg = "API key not set. Please add your GNews API key in js/config.js.";
        if (errorDiv) errorDiv.textContent = msg;
        console.error(msg);
        return;
    }

    try {

        showLoader(loader);

        errorDiv.textContent = "";
        newsContainer.innerHTML = "";

        const apiUrl =
            `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=20&apikey=${API_KEY}`;

        const response = await fetch(getProxyUrl(apiUrl));

        // Read raw response text so we can log helpful debug info when API
        // returns an error page or JSON error message (helps diagnose 400s).
        const raw = await response.text();
        let data;
        try {
            data = JSON.parse(raw);
        } catch (e) {
            data = { raw };
        }

        if (!response.ok) {
            console.error("GNews API responded with error", response.status, data);
            throw new Error(data.message || `Failed to fetch news (status ${response.status})`);
        }

        displayNews(newsContainer, data.articles);

    } catch (error) {

        // Surface error in UI and console for easier debugging
        errorDiv.textContent = error.message;
        console.error("fetchTopNews error:", error);

    } finally {

        hideLoader(loader);

    }
}

export async function searchNews(elements, query) {

    const { loader, errorDiv, newsContainer } = elements;

    if (!API_KEY || API_KEY === "YOUR_API_KEY") {
        const msg = "API key not set. Please add your GNews API key in js/config.js.";
        if (errorDiv) errorDiv.textContent = msg;
        console.error(msg);
        return;
    }

    try {

        showLoader(loader);

        errorDiv.textContent = "";
        newsContainer.innerHTML = "";

        const apiUrl =
            `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=20&apikey=${API_KEY}`;

        const response = await fetch(getProxyUrl(apiUrl));

        const raw = await response.text();
        let data;
        try {
            data = JSON.parse(raw);
        } catch (e) {
            data = { raw };
        }

        if (!response.ok) {
            console.error("GNews API search responded with error", response.status, data);
            throw new Error(data.message || `Failed to search (status ${response.status})`);
        }

        displayNews(newsContainer, data.articles);

    } catch (error) {

        // Surface error in UI and console for easier debugging
        errorDiv.textContent = error.message;
        console.error("searchNews error:", error);

    } finally {

        hideLoader(loader);

    }
}