import { useState, useEffect } from "react";
import "./newsCard.css";
import noImage from "./assets/noImage.png";

function NewsCard({ title, description, image, url, date }) {
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSummary("");
    }, [url]);

    const summarizeArticle = async () => {
        setLoading(true);
        try {
            const apiKey = import.meta.env.VITE_GROQ_API_KEY;

            const response = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant",
                    messages: [
                        {
                            role: "user",
                            content: `Write a concise 3-4 sentence summary of the following news article.

                            Rules:
                            * Return ONLY the summary text.
                            * Do NOT explain anything.
                            * Do NOT mention missing descriptions or limited information.
                            * Do NOT add introductions like "Here is a summary".
                            * The output must be exactly 2 sentences.

                            Title: ${title}

                            Description:
                            ${description || ""}

                            Article URL:
                            ${url}`
                        }
                    ],
                    max_tokens: 60
                }),
            });

            const data = await response.json();

            if (data.choices && data.choices.length > 0) {
                const text = data.choices[0].message.content;
                setSummary(text);
            } else {
                setSummary("Error: Could not retrieve summary.");
                console.error("Groq API Error:", data);
            }
        } catch (error) {
            console.error("Error summarizing article:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="news-card">
            <img
                src={image || noImage}
                alt="news"
                className="news-image"
                onError={(e) => {
                    e.currentTarget.src = noImage;
                }}
            />

            <div className="news-content">
                <div className="news-header">
                    <h3 className="news-title">{title}</h3>
                    <span className="news-date">{date || ""}</span>
                </div>
                <p className="news-description">{description}</p>
                {summary && <p className="summary">{summary}</p>}

                <div className="card-actions">
                    <a href={url} target="_blank" className="read-more">
                        Read More
                    </a>
                    <button className="summarize-btn" onClick={summarizeArticle} disabled={loading}>
                        {loading ? "Summarizing..." : "Summarize with AI"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;