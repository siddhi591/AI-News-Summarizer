import { useState } from "react";
import "./Navbar.css";
import logo from './assets/logo.svg'

function Navbar({ setCategory, setSearchQuery }) {
    const [search, setSearch] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setSearchQuery(search);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="logo" className="logo" />
                <h2 className="title">News Summarizer</h2>
                <a href="#" className="nav-link">Home</a>
                <select className="nav-select" onChange={(e) => {
                    setCategory(e.target.value);
                    setSearchQuery("");
                }} defaultValue="technology">
                    <option value="technology">Technology</option>
                    <option value="business">Business</option>
                    <option value="science">Science</option>
                    <option value="health">Health</option>
                    <option value="sports">Sports</option>
                    <option value="entertainment">Entertainment</option>
                </select>
            </div>

            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Search news..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="search-input"
                />
            </div>

            <div className="navbar-right">
                <button className="theme-toggle">🌙</button>
            </div>
        </nav>
    );
}

export default Navbar;
