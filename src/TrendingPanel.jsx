import React, { useState, useEffect } from "react";
import "./TrendingPanel.css";
import "./Skeleton.css";

function TrendingPanel({ articles = [], loading }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const trending = articles.slice(0, 3);

    useEffect(() => {
        if (!trending.length || loading) return;

        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % trending.length);
        }, 6000);

        return () => clearInterval(intervalId);
    }, [trending.length, loading]);

    if (loading) {
        return (
            <section className="trending-section">
                <div className="trending-card">
                    <div className="trending-left" style={{ width: "100%", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
                        <div className="skeleton-trending-title"></div>
                        <div className="skeleton-trending-title short"></div>
                    </div>
                    <div className="trending-right" style={{ width: "100%", justifyContent: "center" }}>
                        <div className="skeleton-trending-desc"></div>
                        <div className="skeleton-trending-desc"></div>
                        <div className="skeleton-trending-desc short"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (!articles.length) return null;

    const currentArticle = trending[currentIndex];

    return (
        <section className="trending-section">
            <div className="trending-card">
                <div className="trending-left">
                    <p id="trending-title" className="trending-title" style={{ fontSize: "1.3rem" }}>
                        {currentArticle.title}
                    </p>
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