import "./newsCard.css";
import noImage from "./assets/noImage.png";
function NewsCard({ title, description, image, url, date }) {
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

                <div className="card-actions">
                    <a href={url} target="_blank" className="read-more">
                        Read More
                    </a>
                    <button className="summarize-btn">
                        Summarize with AI
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;