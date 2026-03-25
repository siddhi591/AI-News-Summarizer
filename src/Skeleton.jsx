import "./Skeleton.css";

export function SkeletonCard() {
    return (
        <div className="news-card skeleton-card">
            <div className="skeleton-image"></div>
            <div className="news-content">
                <div className="news-header">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-date"></div>
                </div>
                <div className="skeleton-description line-1"></div>
                <div className="skeleton-description line-2"></div>
                <div className="skeleton-description line-3"></div>
                <div className="card-actions">
                    <div className="skeleton-read-more"></div>
                    <div className="skeleton-btn"></div>
                </div>
            </div>
        </div>
    );
}
