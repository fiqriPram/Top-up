import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { games } from '../utils/gameData'
import { formatIDR } from '../utils/currency'

function TopUp() {
  const { gameId } = useParams()
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [selectedType, setSelectedType] = useState('currency')
  const [showPaymentSummary, setShowPaymentSummary] = useState(false)
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
    if (!selectedOffer) {
      alert('Please select an offer first')
      return
    }
    setShowPaymentSummary(true)
  }

  const renderOfferCard = (offer, type) => {
    const isSelected = selectedOffer && selectedOffer.price === offer.price && 
                      selectedOffer.name === offer.name && selectedType === type

    return (
      <div
        key={`${offer.name}-${offer.price}`}
        className={`amount-card ${isSelected ? 'selected' : ''}`}
        onClick={() => {
          setSelectedOffer(offer)
          setSelectedType(type)
        }}
      >
        {type === 'currency' ? (
          <>
            <div className="amount-value">{offer.amount}</div>
            <div className="amount-name">{offer.name}</div>
          </>
        ) : (
          <>
            <div className="offer-name">{offer.name}</div>
            <div className="offer-description">{offer.description}</div>
          </>
        )}
        <div className="amount-price">{formatIDR(offer.price)}</div>
      </div>
    )
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

          <div className="amount-selection">
            <div className="offer-tabs">
              <button 
                className={`tab-button ${selectedType === 'currency' ? 'active' : ''}`}
                onClick={() => setSelectedType('currency')}
              >
                Game Currency
              </button>
              <button 
                className={`tab-button ${selectedType === 'special' ? 'active' : ''}`}
                onClick={() => setSelectedType('special')}
              >
                Special Offers
              </button>
              <button 
                className={`tab-button ${selectedType === 'gamepass' ? 'active' : ''}`}
                onClick={() => setSelectedType('gamepass')}
              >
                Game Pass
              </button>
            </div>

            <div className="amount-grid">
              {game.offers[selectedType].map(offer => renderOfferCard(offer, selectedType))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="topup-form">
            <div className="form-group">
              <label htmlFor="userId">User ID</label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                required
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
              />
            </div>

            <div className="selected-amount">
              {selectedOffer && (
                <div className="amount-summary">
                  <h3>Selected Offer:</h3>
                  <p className="amount-detail">
                    {selectedType === 'currency' 
                      ? `${selectedOffer.amount} ${selectedOffer.name}`
                      : selectedOffer.name}
                  </p>
                  {selectedType !== 'currency' && (
                    <p className="offer-description">{selectedOffer.description}</p>
                  )}
                  <p className="price-detail">{formatIDR(selectedOffer.price)}</p>
                </div>
              )}
            </div>

            <div className="payment-section">
              {showPaymentSummary ? (
                <>
                  <div className="payment-summary">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>{selectedOffer ? formatIDR(selectedOffer.price) : '-'}</span>
                    </div>
                    <div className="summary-row">
                      <span>Platform Fee</span>
                      <span>{selectedOffer ? formatIDR(1000) : '-'}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total Payment</span>
                      <span>{selectedOffer ? formatIDR(selectedOffer.price + 1000) : '-'}</span>
                    </div>
                  </div>
                  <button 
                    className="payment-button"
                    onClick={() => {
                      // Payment processing logic will be implemented here
                      alert('Processing payment...')
                      setShowPaymentSummary(false)
                      // Reset form
                      setFormData({
                        userId: '',
                        email: '',
                        phone: ''
                      })
                      setSelectedOffer(null)
                    }}
                  >
                    <span className="payment-button-content">
                      <i className="fas fa-lock"></i>
                      <span className="payment-text">
                        Confirm Payment
                        <span className="payment-amount">
                          {formatIDR(selectedOffer.price + 1000)}
                        </span>
                      </span>
                    </span>
                  </button>
                </>
              ) : (
                <button 
                  type="submit" 
                  className={`payment-button ${!selectedOffer ? 'disabled' : ''}`}
                  disabled={!selectedOffer}
                >
                  <span className="payment-button-content">
                    <i className="fas fa-lock"></i>
                    <span className="payment-text">
                      Review Payment
                      {selectedOffer && (
                        <span className="payment-amount">
                          {formatIDR(selectedOffer.price)}
                        </span>
                      )}
                    </span>
                  </span>
                </button>
              )}
              <div className="secure-info">
                <i className="fas fa-shield-alt"></i>
                <span>Secure payment by RxRStore</span>
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
