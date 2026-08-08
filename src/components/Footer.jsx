export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <a href="#/" className="logo" style={{ color: "#fff", marginBottom: 12, display: "inline-block" }}>
            Swiggy<span className="dot" style={{ color: "var(--orange)" }}>.</span>
          </a>
          <p style={{ fontSize: 13, lineHeight: 1.7, marginTop: 10 }}>
            A student project recreating the Swiggy interface for UI practice. Not affiliated with Swiggy.
          </p>
        </div>
        <div>
          <h4>Company</h4>
          <ul><li>About Us</li><li>Careers</li><li>Team</li><li>Swiggy One</li></ul>
        </div>
        <div>
          <h4>Contact us</h4>
          <ul><li>Help & Support</li><li>Partner with us</li><li>Ride with us</li></ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul><li>Terms & Conditions</li><li>Cookie Policy</li><li>Privacy Policy</li></ul>
        </div>
        <div>
          <h4>Available in</h4>
          <ul><li>Trivandrum</li><li>Kochi</li><li>Kozhikode</li><li>Bengaluru</li></ul>
        </div>
      </div>
      <div className="footer-bottom">© 2026 Swiggy Clone. Built for a UI challenge.</div>
    </footer>
  );
}
