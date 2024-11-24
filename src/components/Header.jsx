import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Check if user previously set dark mode
    const darkModePreference = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(darkModePreference)
    if (darkModePreference) {
      document.documentElement.classList.add('dark-mode')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    document.documentElement.classList.toggle('dark-mode')
    localStorage.setItem('darkMode', newDarkMode)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality
    console.log('Searching for:', searchQuery)
  }

  return (
    <header className="site-header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span>RxRStore</span>
        </Link>

        <div className={`search-container ${isSearchOpen ? 'active' : ''}`}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>

        <div className="header-actions">
          <button 
            className="mobile-search-toggle"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Toggle search"
          >
            <i className="fas fa-search"></i>
          </button>

          <button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          <div className="auth-buttons">
            <Link to="/login" className="btn-login">
              <i className="fas fa-user"></i>
              <span>Login</span>
            </Link>
            <Link to="/register" className="btn-register">Register</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
