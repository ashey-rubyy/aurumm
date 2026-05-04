/* ============================================
   AURUM LOGISTICS - Navigation Component
   ============================================ */

const NAV_HTML = `
<nav class="navbar" id="navbar">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <div class="logo-mark">A</div>
      <div class="logo-text">
        AURUM
        <span>Secure Logistics</span>
      </div>
    </a>
    <div class="nav-links">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="tracking.html">Track Shipment</a>
      <a href="contact.html">Contact</a>
      <a href="admin.html">Admin</a>
    </div>
    <div class="nav-actions">
      <button class="dark-toggle" id="darkToggle" title="Toggle theme">🌙</button>
      <a href="tracking.html" class="btn btn-primary" style="padding:10px 20px;font-size:0.7rem">Track Now</a>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="services.html">Services</a>
  <a href="tracking.html">Track Shipment</a>
  <a href="contact.html">Contact</a>
  <a href="admin.html">Admin</a>
</div>
`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-main">
      <div>
        <a href="index.html" class="nav-logo" style="display:inline-flex">
          <div class="logo-mark">A</div>
          <div class="logo-text">AURUM<span>Secure Logistics</span></div>
        </a>
        <p class="footer-brand-desc">
          The world's most trusted logistics partner for high-value commodities. 
          Precision, security, and discretion — delivered globally.
        </p>
        <div style="margin-top:24px;display:flex;gap:12px">
          <a href="#" style="width:34px;height:34px;border:1px solid var(--glass-border);display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:14px;transition:0.2s" onmouseover="this.style.color='var(--gold)';this.style.borderColor='var(--gold)'" onmouseout="this.style.color='var(--text-muted)';this.style.borderColor='var(--glass-border)'">in</a>
          <a href="#" style="width:34px;height:34px;border:1px solid var(--glass-border);display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:14px;transition:0.2s" onmouseover="this.style.color='var(--gold)';this.style.borderColor='var(--gold)'" onmouseout="this.style.color='var(--text-muted)';this.style.borderColor='var(--glass-border)'">𝕏</a>
        </div>
      </div>
      <div>
        <div class="footer-title">Services</div>
        <nav class="footer-links">
          <a href="services.html">Secure Gold Transport</a>
          <a href="services.html">Diamond Logistics</a>
          <a href="services.html">Vault Storage</a>
          <a href="services.html">Armored Transport</a>
          <a href="services.html">Air Freight</a>
          <a href="services.html">Customs Compliance</a>
        </nav>
      </div>
      <div>
        <div class="footer-title">Company</div>
        <nav class="footer-links">
          <a href="about.html">About Aurum</a>
          <a href="about.html">Leadership</a>
          <a href="about.html">Security Standards</a>
          <a href="contact.html">Contact</a>
          <a href="tracking.html">Track Shipment</a>
          <a href="admin.html">Admin Portal</a>
        </nav>
      </div>
      <div>
        <div class="footer-title">Certifications</div>
        <nav class="footer-links">
          <a href="#">ISO 28000 Certified</a>
          <a href="#">LBMA Member</a>
          <a href="#">IATA Approved</a>
          <a href="#">AEO Status</a>
          <a href="#">TAPA FSR Level A</a>
        </nav>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Aurum Secure Logistics Holdings Ltd. All rights reserved.</span>
      <div class="footer-legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Security Policy</a>
      </div>
    </div>
  </div>
</footer>
`;

// Inject nav and footer
document.addEventListener('DOMContentLoaded', () => {
  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = NAV_HTML;
  if (footerPlaceholder) footerPlaceholder.outerHTML = FOOTER_HTML;
});
