import { useState } from "react";

const CATEGORIES = [
  {
    id: "orders",
    label: "🍽️ Orders & Delivery",
    faqs: [
      { q: "How do I track my order?", a: "Once your order is placed, go to the Cart page or your order confirmation screen to see live status updates from the restaurant to your doorstep." },
      { q: "How do I cancel an order?", a: "You can cancel an order before it's accepted by the restaurant from your order details page. Cancellations after preparation begins may not be eligible for a full refund." },
      { q: "My order arrived incomplete, what do I do?", a: "Report the issue within 24 hours from the Help section on your order. Our support team will review and process a refund or credit if applicable." }
    ]
  },
  {
    id: "payments",
    label: "💳 Payments & Refunds",
    faqs: [
      { q: "How long do refunds take?", a: "Refunds are typically processed within 5 to 7 business days and are credited back to your original payment method." },
      { q: "Which payment methods are supported?", a: "UPI, credit and debit cards, net banking, and popular wallets are all supported at checkout." },
      { q: "My payment failed but money was deducted", a: "Failed payments are auto reversed within 5 to 7 business days. Reach out to support if it takes longer." }
    ]
  },
  {
    id: "account",
    label: "👤 Account & Profile",
    faqs: [
      { q: "How do I change my delivery address?", a: "Go to your profile, select Addresses, and add or edit a saved address before placing your next order." },
      { q: "How do I delete my account?", a: "You can request account deletion from the profile settings page. This action is permanent." }
    ]
  },
  {
    id: "offers",
    label: "🎁 Offers & Swiggy One",
    faqs: [
      { q: "Can I schedule an order in advance?", a: "Yes, select a restaurant and look for the schedule option at checkout to place an order for a later time." },
      { q: "How do I apply a coupon code?", a: "Enter the coupon code at checkout in the offers section, or pick one from the list of auto suggested offers." }
    ]
  },
  {
    id: "partner",
    label: "🏬 Partner with us",
    faqs: [
      { q: "I want to partner my restaurant with Swiggy", a: "Fill out the partner onboarding form on our corporate site and our onboarding team will reach out within 3 business days." },
      { q: "What documents are needed to list my restaurant?", a: "FSSAI license, GST certificate, PAN card and bank account details are required to complete onboarding." }
    ]
  }
];

export default function Help() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [openIndex, setOpenIndex] = useState(null);

  const category = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="help-wrap wide">
      <div className="page-title-bar" style={{ padding: "0 0 24px" }}>
        <h1>🆘 Help & Support</h1>
      </div>

      <div className="help-cards">
        <div className="help-card">
          <span className="help-card-emoji">📦</span>
          <h3>Order issues</h3>
          <p>Missing items, wrong order or quality</p>
        </div>
        <div className="help-card">
          <span className="help-card-emoji">⏱️</span>
          <h3>Delivery delay</h3>
          <p>Track late orders and refunds</p>
        </div>
        <div className="help-card">
          <span className="help-card-emoji">💳</span>
          <h3>Payments</h3>
          <p>Refunds, failed transactions and dues</p>
        </div>
      </div>

      <div className="help-body">
        <aside className="help-sidebar">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`help-sidebar-item ${activeCategory === c.id ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(c.id);
                setOpenIndex(null);
              }}
            >
              {c.label}
            </button>
          ))}
        </aside>

        <div className="help-content">
          <h2 style={{ fontSize: 19, marginBottom: 6 }}>{category.label}</h2>
          {category.faqs.map((f, i) => (
            <div className={`faq-item ${openIndex === i ? "open" : ""}`} key={i}>
              <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                {f.q}
                <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div className="faq-answer">{f.a}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-box">
        <h3>💬 Still need help?</h3>
        <p>Our support team is available 24x7 to assist you</p>
        <button
          className="primary-btn"
          style={{ width: "auto", padding: "12px 30px" }}
          onClick={() => alert("Demo build: live chat is not wired to a backend.")}
        >
          Chat with us
        </button>
      </div>
    </div>
  );
}
