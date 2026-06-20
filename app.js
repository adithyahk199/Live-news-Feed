import { setupEvents } from "./events.js";

setupEvents({

    loader: document.getElementById("loader"),
    newsContainer: document.getElementById("newsContainer"),
    errorDiv: document.getElementById("error"),
    searchBtn: document.getElementById("searchBtn"),
    searchInput: document.getElementById("searchInput"),
    categorySelect: document.getElementById("category")

});
