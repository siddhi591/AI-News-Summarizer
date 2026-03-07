import { useState } from "react";
import "./Navbar.css";
import logo from './assets/logo.svg'

function Navbar() {
    const [search, setSearch] = useState("");

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="logo" className="logo" />
                <h2 className="title">Tech News</h2>
                <a href="#" className="nav-link">Home</a>
                <select className="nav-select">
                    <option>Categories</option>
                    <option>AI</option>
                    <option>Programming</option>
                    <option>Startups</option>
                </select>
            </div>

            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Search news..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
