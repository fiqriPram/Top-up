import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { games } from '../utils/gameData'

function Home() {
  return (
    <div className="app-container">
      <Header />
      <Hero />
      
      <main className="main-content">
        <section className="games-section">
          <h2>Choose Your Game</h2>
          <div className="games-grid">
            {games.map(game => (
              <Link 
                to={`/topup/${game.id}`} 
                key={game.id}
                className="game-card"
              >
                <img src={game.image} alt={game.name} />
                <div className="game-info">
                  <h3>{game.name}</h3>
                  <span>Click to select</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
