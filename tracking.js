/* ============================================
   AURUM LOGISTICS - Shipment Tracking JS
   ============================================ */

// ---- Shipment Database ----
const SHIPMENTS = {
    'AUR-2026-010': {
        id: 'AUR-2026-010',
        type: 'Gold Bullion (37kg)',
        status: 'In Transit',
        statusCode: 'in-transit',
        progress: 35,
        origin: 'Germany',
        destination: 'United States of America',
        currentLocation: 'Germany Customs',
        estimatedDelivery: 'N/A:Item currently on hold',
        weight: '37 kg',
        value: 'Highly Classified',
        handler: 'Aurum Logistics',
        history: [
            { time: 'Feb 25, 2026 — 08:14 GMT', event: `Departed Aurum's Germany Secure Vault`, location: 'Berlin, Germany' },
            { time: 'Feb 25, 2026 — 14:30 GMT', event: 'Not Cleared by Customs', location: 'Berlin Brandenburg Airport, Germany' },

        ]
    },
    'AUR-2024-002': {
        id: 'AUR-2024-002',
        type: 'Diamond Collection',
        status: 'Cleared Customs',
        statusCode: 'customs',
        progress: 82,
        origin: 'Antwerp, Belgium',
        destination: 'Dubai, UAE',
        currentLocation: 'Dubai International Airport',
        estimatedDelivery: 'February 28, 2026',
        weight: '2.3 kg',
        value: 'Classified',
        handler: 'Aurum Special Courier',
        history: [
            { time: 'Feb 20, 2026 — 09:00 GMT', event: 'Collected from Antwerp Diamond Exchange', location: 'Antwerp, Belgium' },
            { time: 'Feb 20, 2026 — 11:45 GMT', event: 'Packed in Secure Tamper-Evident Container', location: 'Brussels Sorting Hub, Belgium' },
            { time: 'Feb 21, 2026 — 07:20 GMT', event: 'Departed Brussels Airport', location: 'Brussels, Belgium' },
            { time: 'Feb 21, 2026 — 18:05 GMT', event: 'Arrived Dubai International', location: 'Dubai, UAE' },
            { time: 'Feb 22, 2026 — 10:30 GMT', event: 'Submitted for UAE Customs Inspection', location: 'Dubai Customs, UAE' },
            { time: 'Feb 26, 2026 — 08:15 GMT', event: 'Customs Clearance Approved', location: 'Dubai International Airport' },
        ]
    },
    'AUR-2024-003': {
        id: 'AUR-2024-003',
        type: 'Luxury Timepieces',
        status: 'Delivered',
        statusCode: 'delivered',
        progress: 100,
        origin: 'Geneva, Switzerland',
        destination: 'Tokyo, Japan',
        currentLocation: 'Tokyo — Delivered',
        estimatedDelivery: 'February 24, 2026',
        weight: '8 kg',
        value: 'Classified',
        handler: 'Aurum Global Express',
        history: [
            { time: 'Feb 18, 2026 — 07:00 CET', event: 'Collected from Richemont Vault', location: 'Geneva, Switzerland' },
            { time: 'Feb 18, 2026 — 10:30 CET', event: 'Cleared Swiss Export Controls', location: 'Geneva Airport' },
            { time: 'Feb 18, 2026 — 14:00 CET', event: 'Departed Geneva', location: 'Geneva, Switzerland' },
            { time: 'Feb 19, 2026 — 08:45 JST', event: 'Arrived Narita International', location: 'Tokyo, Japan' },
            { time: 'Feb 19, 2026 — 14:20 JST', event: 'Cleared Japanese Customs', location: 'Narita Airport, Japan' },
            { time: 'Feb 24, 2026 — 11:00 JST', event: 'Delivered to Recipient. Signature Obtained.', location: 'Tokyo, Japan' },
        ]
    },
    'AUR-2024-004': {
        id: 'AUR-2024-004',
        type: 'Rare Artifacts',
        status: 'Processing',
        statusCode: 'processing',
        progress: 20,
        origin: 'New York, USA',
        destination: 'London, UK',
        currentLocation: 'New York Processing Center',
        estimatedDelivery: 'March 10, 2026',
        weight: '15 kg',
        value: 'Classified',
        handler: 'Aurum Cultural Freight',
        history: [
            { time: 'Feb 26, 2026 — 09:00 EST', event: 'Shipment Registered in System', location: 'New York, USA' },
            { time: 'Feb 26, 2026 — 11:30 EST', event: 'Documentation Verification In Progress', location: 'New York Processing Center' },
        ]
    },
    'AUR-2024-005': {
        id: 'AUR-2024-005',
        type: 'Platinum Bars',
        status: 'In Transit',
        statusCode: 'in-transit',
        progress: 50,
        origin: 'Singapore',
        destination: 'Zurich, Switzerland',
        currentLocation: 'Abu Dhabi Transit Hub, UAE',
        estimatedDelivery: 'March 3, 2026',
        weight: '30 kg',
        value: 'Classified',
        handler: 'Aurum Air Express',
        history: [
            { time: 'Feb 23, 2026 — 06:00 SGT', event: 'Departed Singapore Freeport', location: 'Singapore' },
            { time: 'Feb 23, 2026 — 08:00 SGT', event: 'Cleared Singapore Customs', location: 'Changi Airport, Singapore' },
            { time: 'Feb 23, 2026 — 10:15 SGT', event: 'Departed Changi', location: 'Singapore' },
            { time: 'Feb 24, 2026 — 01:40 GST', event: 'Arrived Abu Dhabi Transit Hub', location: 'Abu Dhabi, UAE' },
            { time: 'Feb 26, 2026 — 07:00 GST', event: 'Awaiting Onward Flight', location: 'Abu Dhabi, UAE' },
        ]
    }
};

const STEPS = ['Registered', 'Processing', 'In Transit', 'Customs', 'Delivered'];
const STATUS_STEP_MAP = {
    'processing': 1,
    'in-transit': 2,
    'customs': 3,
    'delivered': 4
};

// ---- DOM Elements ----
let inputEl, trackBtn, spinnerWrap, resultWrap, errorEl;

const getStatus = (code) => {
    const map = {
        'in-transit': { label: 'In Transit', pct: '' },
        'customs': { label: 'Cleared Customs', pct: '' },
        'delivered': { label: 'Delivered', pct: '' },
        'processing': { label: 'Processing', pct: '' }
    };
    return map[code] || { label: code, pct: '' };
};

const renderResult = (shipment) => {
        const s = shipment;
        const statusInfo = getStatus(s.statusCode);
        const activeStep = STATUS_STEP_MAP[s.statusCode] || 0;

        resultWrap.innerHTML = `
    <div class="result-header fade-up visible">
      <div class="result-id-row">
        <div class="result-tracking-id">${s.id}</div>
        <div class="security-badge">
          <div class="security-badge-dot"></div>
          Security Verified
        </div>
      </div>
      <div class="result-meta">
        <div class="meta-item">
          <label>Shipment Type</label>
          <span>${s.type}</span>
        </div>
        <div class="meta-item">
          <label>Origin</label>
          <span>${s.origin}</span>
        </div>
        <div class="meta-item">
          <label>Destination</label>
          <span>${s.destination}</span>
        </div>
        <div class="meta-item">
          <label>Est. Delivery</label>
          <span>${s.estimatedDelivery}</span>
        </div>
      </div>
    </div>

    <div class="progress-section fade-up fade-up-delay-1 visible">
      <div class="progress-label">
        <span class="progress-status">${s.status}</span>
        <span class="progress-pct">${s.progress}% Complete</span>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" id="progressFill"></div>
      </div>
      <div class="progress-steps">
        ${STEPS.map((step, i) => `
          <div class="progress-step">
            <div class="step-dot ${i < activeStep ? 'done' : i === activeStep ? 'active' : ''}">
              ${i < activeStep ? '✓' : i + 1}
            </div>
            <div class="step-label">${step}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="timeline-section fade-up fade-up-delay-2 visible">
      <div class="timeline-title">Shipment Timeline</div>
      <div class="timeline">
        ${s.history.map((h, i) => `
          <div class="timeline-item" style="transition-delay: ${i * 0.08}s">
            <div class="timeline-time">${h.time}</div>
            <div class="timeline-event">${h.event}</div>
            <div class="timeline-location">📍 ${h.location}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  resultWrap.style.display = 'block';

  // Animate progress bar
  setTimeout(() => {
    const fill = document.getElementById('progressFill');
    if (fill) fill.style.width = s.progress + '%';
  }, 150);

  // Animate timeline items
  setTimeout(() => {
    resultWrap.querySelectorAll('.timeline-item').forEach((item, i) => {
      setTimeout(() => item.classList.add('visible'), i * 100);
    });
  }, 400);
};

const showError = () => {
  errorEl.style.display = 'flex';
  resultWrap.style.display = 'none';
};

const hideError = () => {
  errorEl.style.display = 'none';
};

const performSearch = (id) => {
  const trimmed = id.trim().toUpperCase();
  if (!trimmed) return;

  hideError();
  resultWrap.style.display = 'none';
  spinnerWrap.style.display = 'flex';

  setTimeout(() => {
    spinnerWrap.style.display = 'none';
    const shipment = SHIPMENTS[trimmed];
    if (shipment) {
      localStorage.setItem('aurum_last_tracking', trimmed);
      renderResult(shipment);
    } else {
      showError();
    }
  }, 1800);
};

// ---- Init Tracking Page ----
const initTracking = () => {
  inputEl = document.getElementById('trackingInput');
  trackBtn = document.getElementById('trackBtn');
  spinnerWrap = document.getElementById('spinnerWrap');
  resultWrap = document.getElementById('trackingResult');
  errorEl = document.getElementById('trackingError');

  if (!inputEl) return;

  trackBtn.addEventListener('click', () => performSearch(inputEl.value));

  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') performSearch(inputEl.value);
  });

  // Sample ID click-fill
  document.querySelectorAll('.sample-id').forEach(el => {
    el.addEventListener('click', () => {
      inputEl.value = el.textContent.trim();
      inputEl.focus();
    });
  });

  // Restore last search
  const last = localStorage.getItem('aurum_last_tracking');
  if (last && SHIPMENTS[last]) {
    inputEl.value = last;
    performSearch(last);
  }
};

document.addEventListener('DOMContentLoaded', initTracking);