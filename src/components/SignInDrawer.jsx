import { useState } from "react";

export default function SignInDrawer({ open, onClose }) {
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const valid = /^[6-9]\d{9}$/.test(phone.trim());

  function handleContinue() {
    if (!valid) return;
    setSending(true);
    setTimeout(() => {
      alert("Demo build: OTP flow is not wired to a backend.");
      setSending(false);
      onClose();
    }, 700);
  }

  return (
    <>
      <div className={`side-drawer-overlay ${open ? "open" : ""}`} onClick={onClose}></div>
      <div className={`side-drawer ${open ? "open" : ""}`}>
        <div className="drawer-header">
          <h2>Sign in</h2>
          <button className="drawer-close" onClick={onClose}>&times;</button>
        </div>
        <div className="drawer-body">
          <p className="lead">or use email to sign in</p>
          <div className="phone-input">
            <span className="prefix">+91</span>
            <input
              type="tel"
              maxLength={10}
              placeholder="Enter mobile number"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
            />
          </div>
          <button className="primary-btn" disabled={!valid} onClick={handleContinue}>
            {sending ? "Sending OTP..." : "Continue"}
          </button>

          <div className="divider-text">OR</div>

          <button className="social-btn">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.81.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.03z"/>
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.97L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>
          <button className="social-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7 10-7"/></svg>
            Continue with Email
          </button>

          <p className="terms-note">
            By continuing, you agree to Swiggy's <a href="#/help">Terms of Service</a> and <a href="#/help">Privacy Policy</a>
          </p>
        </div>
      </div>
    </>
  );
}
