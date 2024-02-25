const apiKey = 'bd159795a22e4534bfd3edcd65737c1f';

const blogContainer = document.getElementById('blog-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function fetchNews(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2024-01-25&sortBy=publishedAt&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news", error);
        return [];
    }
}

function displayNews(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        
        const title = document.createElement("h2");
        title.textContent = article.title;
        
        const description = document.createElement("p");
        description.textContent = article.description;
        
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        
        blogContainer.appendChild(blogCard);
    });
}

searchButton.addEventListener('click', async () => {
    const query = searchInput.value;
    if (query) {
        const articles = await fetchNews(query);
        displayNews(articles);
    }
});

// Fetch and display initial news
(async () => {
    const defaultQuery = 'tesla'; // Default query
    const articles = await fetchNews(defaultQuery);
    displayNews(articles);
})();
