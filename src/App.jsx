import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar';
import TrendingPanel from './TrendingPanel';
import NewsCard from './NewsCard';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("technology");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=${API_KEY}`;
        if (searchQuery) {
          url = `https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (data.articles) {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [category, searchQuery]);

  return (
    <>
      <Navbar setCategory={setCategory} setSearchQuery={setSearchQuery} />
      <TrendingPanel articles={articles} />
      <div className="news-container">
        {articles.map((article, index) => (
          <NewsCard
            key={index}
            title={article.title}
            description={article.description}
            image={article.urlToImage || "https://via.placeholder.com/400x200"}
            url={article.url}
            date={article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ""}
          />
        ))}
      </div>
    </>
  );
}

export default App;
