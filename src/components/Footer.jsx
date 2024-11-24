function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About RxRStore</h4>
          <p>
            Your trusted destination for game top-ups and digital content. 
            We provide secure, fast, and reliable service for gamers worldwide.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i> WhatsApp Support
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} RxRStore. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
