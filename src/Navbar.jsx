import { useState } from "react";
import "./Navbar.css";
import logo from './assets/logo.svg'

function Navbar({ category, setCategory, setSearchQuery, theme, toggleTheme }) {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

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
                    <input
                        type="text"
                        placeholder="Search news..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="search-bar"
                    />
                    <button className="theme-btn" onClick={toggleTheme}>
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                </div>

                <div className="nav-right mobile-theme">
                    <button className="theme-btn" onClick={toggleTheme}>
                        {theme === "dark" ? "☀️" : "🌙"}
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
                        placeholder="Search news..."
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
