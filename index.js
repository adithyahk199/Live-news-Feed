const API_KEY = "c0a60f88111d3c180a38dcb5f873168c";

    const loader = document.getElementById("loader");
    const newsContainer = document.getElementById("newsContainer");
    const errorDiv = document.getElementById("error");

    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("category");

    function showLoader(){
        loader.style.display = "block";
    }

    function hideLoader(){
        loader.style.display = "none";
    }

    async function fetchTopNews(category="general"){

        try{

            showLoader();

            errorDiv.textContent = "";
            newsContainer.innerHTML = "";

            const url =
                `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=20&apikey=${API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                throw new Error(
                    data.errors?.join(", ") ||
                    data.message ||
                    "Failed to fetch news"
                );
            }

            displayNews(data.articles);

        }
        catch(error){

            errorDiv.textContent = error.message;

        }
        finally{

            hideLoader();

        }
    }

    async function searchNews(query){

        try{

            showLoader();

            errorDiv.textContent = "";
            newsContainer.innerHTML = "";

            const url =
                `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=20&apikey=${API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                throw new Error(
                    data.errors?.join(", ") ||
                    data.message ||
                    "Failed to search news"
                );
            }

            displayNews(data.articles);

        }
        catch(error){

            errorDiv.textContent = error.message;

        }
        finally{

            hideLoader();

        }
    }

    function displayNews(articles){

        if(!articles || articles.length===0){

            newsContainer.innerHTML =
                `<div class="no-news">No News Found</div>`;

            return;
        }

        articles.forEach(article=>{

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
            ${new Date(article.publishedAt).toLocaleDateString()}
            </small>

            <h3>${article.title || "No Title"}</h3>

            <p>
            ${article.description || "No Description Available"}
            </p>

            <a href="${article.url}" target="_blank">
            Read Full Article
            </a>

        </div>
        `;

            newsContainer.appendChild(card);
        });
    }

    searchBtn.addEventListener("click",()=>{

        const query = searchInput.value.trim();

        if(query){
            searchNews(query);
        }
    });

    searchInput.addEventListener("keypress",(e)=>{

        if(e.key==="Enter"){
            searchBtn.click();
        }
    });

    categorySelect.addEventListener("change",()=>{

        fetchTopNews(categorySelect.value);
    });

    window.onload = ()=>{

        fetchTopNews();
    };