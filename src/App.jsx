import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar';
import TrendingPanel from './TrendingPanel';
import NewsCard from './NewsCard';
import { SkeletonCard } from './Skeleton';


function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("technology");
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          category,
          q: searchQuery,
        });
        const response = await fetch(`/api/news?${params.toString()}`);
        const data = await response.json();
        if (data.articles) {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, searchQuery]);

  return (
    <>
      <Navbar
        category={category}
        setCategory={setCategory}
        setSearchQuery={setSearchQuery}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className="container">
        <TrendingPanel articles={articles} loading={loading} />
        <div className="news-container">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            articles.map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                description={article.description}
                image={article.urlToImage || "https://via.placeholder.com/400x200"}
                url={article.url}
                date={article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ""}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
