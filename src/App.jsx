import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TopUp from './pages/TopUp'
import Login from './pages/Login'
import Register from './pages/Register'
import Transaction from './pages/Transaction'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topup/:gameId" element={<TopUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </Router>
  )
}

export default App
