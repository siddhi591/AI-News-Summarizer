import React, { useState, useEffect } from "react";
import "./TrendingPanel.css";

function TrendingPanel({ articles = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const trending = articles.slice(0, 3);

    useEffect(() => {
        if (!trending.length) return;

        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % trending.length);
        }, 6000);

        return () => clearInterval(intervalId);
    }, [trending.length]);

    if (!articles.length) return null;

    const currentArticle = trending[currentIndex];

    return (
        <section className="trending-section">
            <div className="trending-card">
                <div className="trending-left">
                    <h1>{currentArticle.title}</h1>
                </div>
                <div className="trending-right">
                    <p>{currentArticle.description}</p>
                    <a href={currentArticle.url} target="_blank" rel="noopener noreferrer" className="trending-arrow">→</a>
                </div>
            </div>
        </section>
    );
}

export default TrendingPanel;