import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from './assets/logo.svg'

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2.2" />
    <path d="M12 2V5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M12 19V22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M4.22 4.22L6.5 6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M17.5 17.5L19.78 19.78" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M2 12H5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M19 12H22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M4.22 19.78L6.5 17.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M17.5 6.5L19.78 4.22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79C20.59 12.88 20.16 12.93 19.73 12.93C15.24 12.93 11.73 9.42 11.73 4.93C11.73 4.5 11.78 4.07 11.87 3.66C8.58 4.6 6.25 7.97 6.25 11.88C6.25 15.87 9.18 18.8 13.17 18.8C17.08 18.8 20.45 16.47 21.39 13.18C21.33 13.28 21.17 12.75 21 12.79Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const suggestions = [
  "Artificial Intelligence",
  "Elon Musk",
  "Machine Learning",
  "Startups",
  "Tech News",
];

function Navbar({ category, setCategory, setSearchQuery, theme, toggleTheme }) {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [typedPlaceholder, setTypedPlaceholder] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
        if (typingTimeoutRef.current) {
            window.clearTimeout(typingTimeoutRef.current);
        }

        if (search !== "") {
            setTypedPlaceholder("");
            setIsDeleting(false);
            setSuggestionIndex(0);
            return;
        }

        const currentSuggestion = suggestions[suggestionIndex];

        if (!isDeleting) {
            if (typedPlaceholder.length < currentSuggestion.length) {
                typingTimeoutRef.current = window.setTimeout(() => {
                    setTypedPlaceholder(currentSuggestion.slice(0, typedPlaceholder.length + 1));
                }, 110);
            } else {
                typingTimeoutRef.current = window.setTimeout(() => {
                    setIsDeleting(true);
                }, 1400);
            }
        } else {
            if (typedPlaceholder.length > 0) {
                typingTimeoutRef.current = window.setTimeout(() => {
                    setTypedPlaceholder(currentSuggestion.slice(0, typedPlaceholder.length - 1));
                }, 50);
            } else {
                typingTimeoutRef.current = window.setTimeout(() => {
                    setIsDeleting(false);
                    setSuggestionIndex((index) => (index + 1) % suggestions.length);
                }, 280);
            }
        }

        return () => {
            if (typingTimeoutRef.current) {
                window.clearTimeout(typingTimeoutRef.current);
            }
        };
    }, [search, suggestionIndex, typedPlaceholder, isDeleting]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setSearchQuery(search);
            setMenuOpen(false);
        }
    };

    const closeMenu = () => setMenuOpen(false);

    const handleHomeClick = () => {
        setCategory("technology");
        setSearchQuery("");
        setSearch("");
        closeMenu();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-left">
                    <button
                        className="menu-btn"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label="Toggle menu"
                    >
                        ☰
                    </button>

                    <div className="logo">
                        <img src={logo} alt="logo" className="logo-img" />
                        <span className="logo-text">News Summarizer</span>
                    </div>
                </div>

                <div className="nav-center desktop-menu">
                    <button className="nav-button" onClick={handleHomeClick}>
                        Home
                    </button>
                    <select
                        className="category-select"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setSearchQuery("");
                            setSearch("");
                        }}
                    >
                        <option value="technology">Technology</option>
                        <option value="business">Business</option>
                        <option value="science">Science</option>
                        <option value="health">Health</option>
                        <option value="sports">Sports</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                </div>

                <div className="nav-right desktop-menu">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            placeholder=""
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="search-bar"
                        />
                        {search === "" && (
                            <div className="search-placeholder">
                                <span className="placeholder-text">
                                    {typedPlaceholder}
                                    <span className="placeholder-cursor">|</span>
                                </span>
                            </div>
                        )}
                    </div>
                    <button type="button" className="theme-btn" onClick={toggleTheme}>
                        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                    </button>
                </div>

                <div className="nav-right mobile-theme">
                    <button type="button" className="theme-btn" onClick={toggleTheme}>
                        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <div className="mobile-menu">
                    <button className="nav-button" onClick={handleHomeClick}>
                        Home
                    </button>
                    <select
                        className="category-select"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setSearchQuery("");
                            setSearch("");
                            closeMenu();
                        }}
                    >
                        <option value="technology">Technology</option>
                        <option value="business">Business</option>
                        <option value="science">Science</option>
                        <option value="health">Health</option>
                        <option value="sports">Sports</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search articleicles..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="search-bar"
                    />
                </div>
            )}
        </>
    );
}

export default Navbar;
