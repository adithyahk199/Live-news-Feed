
import { API_KEY } from "./config.js";
import { getProxyUrl } from "./helpers.js";

export async function fetchTopNews(category = "general") {

    const apiUrl =
        `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=20&apikey=${API_KEY}`;

    const response = await fetch(getProxyUrl(apiUrl));

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch news");
    }

    return data.articles;
}

export async function searchNews(query) {

    const apiUrl =
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=20&apikey=${API_KEY}`;

    const response = await fetch(getProxyUrl(apiUrl));

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to search news");
    }

    return data.articles;
}