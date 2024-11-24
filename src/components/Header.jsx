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

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      // Focus the input when search box opens
      setTimeout(() => {
        document.querySelector('.search-input')?.focus()
      }, 100)
    }
  }

  return (
    <header className="site-header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <Link to="/">
              <div className="logo-container">
                <div className="logo-text">
                  <span className="logo-name">RXRSTORE</span>
                  <span className="logo-tagline">Premium Game Store</span>
                </div>
              </div>
            </Link>
          </div>
          <Link to="/transaction" className="transaction-link">
            <i className="fas fa-history"></i>
            <span className="transaction-text">Transactions</span>
          </Link>
        </div>

        <div className="header-actions">
          <div className="search-wrapper">
            <form onSubmit={handleSearch} className={`search-form ${isSearchOpen ? 'show' : ''}`}>
              <input
                className="search-input"
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <button onClick={toggleSearch} className="search-icon-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
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
