import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { games } from '../utils/gameData'
import { formatIDR } from '../utils/currency'

function TopUp() {
  const { gameId } = useParams()
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [formData, setFormData] = useState({
    userId: '',
    email: '',
    phone: ''
  })

  const game = games.find(g => g.id === parseInt(gameId))

  if (!game) {
    return (
      <div className="app-container">
        <Header />
        <main className="main-content">
          <div className="error-message">
            <h2>Game not found</h2>
            <Link to="/" className="back-button">← Back to Games</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedAmount) {
      alert('Please select an amount first')
      return
    }
    // Payment logic will be implemented here
    alert('Order submitted successfully!')
  }

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Link to="/" className="back-button">← Back to Games</Link>
        
        <section className="topup-section">
          <div className="game-details">
            <img src={game.image} alt={game.name} className="game-image" />
            <h2>{game.name}</h2>
          </div>

          <form onSubmit={handleSubmit} className="topup-form">
            <div className="form-section">
              <h3>Select Amount</h3>
              <div className="amount-grid">
                {game.amounts.map((amount, index) => {
                  const currencyType = Object.keys(amount).find(key => key !== 'price')
                  return (
                    <div
                      key={index}
                      className={`amount-card ${selectedAmount === amount ? 'selected' : ''}`}
                      onClick={() => setSelectedAmount(amount)}
                    >
                      <div className="amount-info">
                        <span className="amount-value">{amount[currencyType]} {currencyType}</span>
                        <span className="amount-price">{formatIDR(amount.price)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="form-section">
              <h3>Enter Details</h3>
              <div className="form-group">
                <label htmlFor="userId">User ID and Server</label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your game ID and Server"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="payment-section">
              <div className="price-summary">
                <span>Total Amount:</span>
                <span className="total-price">
                  {selectedAmount ? formatIDR(selectedAmount.price) : 'Rp 0'}
                </span>
              </div>
              
              <button 
                type="submit" 
                className={`payment-button ${!selectedAmount ? 'disabled' : ''}`}
                disabled={!selectedAmount}
              >
                <span className="payment-button-content">
                  <i className="fas fa-lock"></i>
                  <span className="payment-text">
                    Pay Securely
                    {selectedAmount && (
                      <span className="payment-amount">
                        {formatIDR(selectedAmount.price)}
                      </span>
                    )}
                  </span>
                </span>
              </button>

              <div className="secure-info">
                <i className="fas fa-shield-alt"></i>
                <span>Secure Payment by <strong>GameTopUp</strong></span>
              </div>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default TopUp
