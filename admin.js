/* ============================================
   AURUM LOGISTICS - Admin JS
   ============================================ */

const ADMIN_KEY = 'aurum_shipments_admin';

const defaultShipments = [
    { id: 'AUR-2024-001', type: 'Gold Bars, 16 Pieces, 1000kg each', origin: 'United States of America', destination: 'Malta', status: 'in-transit', date: '2026-02-25' },
    { id: 'AUR-2024-002', type: 'Diamond Collection', origin: 'Antwerp', destination: 'Dubai', status: 'customs', date: '2026-02-20' },
    { id: 'AUR-2024-003', type: 'Luxury Timepieces', origin: 'Geneva', destination: 'Tokyo', status: 'delivered', date: '2026-02-18' },
    { id: 'AUR-2024-004', type: 'Rare Artifacts', origin: 'New York', destination: 'London', status: 'processing', date: '2026-02-26' },
    { id: 'AUR-2024-005', type: 'Platinum Bars', origin: 'Singapore', destination: 'Zurich', status: 'in-transit', date: '2026-02-23' },
];

const getShipments = () => {
    const stored = localStorage.getItem(ADMIN_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(defaultShipments));
    return defaultShipments;
};

const saveShipments = (data) => localStorage.setItem(ADMIN_KEY, JSON.stringify(data));

const statusLabels = {
    'in-transit': 'In Transit',
    'customs': 'Cleared Customs',
    'delivered': 'Delivered',
    'processing': 'Processing'
};

const renderTable = (filter = 'all') => {
    const tbody = document.getElementById('shipmentsBody');
    if (!tbody) return;
    const all = getShipments();
    const filtered = filter === 'all' ? all : all.filter(s => s.status === filter);

    tbody.innerHTML = filtered.length === 0 ? `
    <tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:40px">No shipments found.</td></tr>
  ` : filtered.map(s => `
    <tr>
      <td style="color:var(--gold);font-family:var(--font-serif)">${s.id}</td>
      <td>${s.type}</td>
      <td>${s.origin}</td>
      <td>${s.destination}</td>
      <td><span class="status-pill ${s.status}">${statusLabels[s.status] || s.status}</span></td>
      <td>${s.date}</td>
      <td>
        <button class="btn btn-ghost" onclick="deleteShipment('${s.id}')" style="padding:6px 14px;font-size:0.68rem">Remove</button>
      </td>
    </tr>
  `).join('');
};

window.deleteShipment = (id) => {
    if (!confirm('Remove this shipment record?')) return;
    const updated = getShipments().filter(s => s.id !== id);
    saveShipments(updated);
    renderTable(document.getElementById('filterSelect') ? .value || 'all');
    updateStats();
};

const updateStats = () => {
    const all = getShipments();
    const el = id => document.getElementById(id);
    if (el('totalCount')) el('totalCount').textContent = all.length;
    if (el('inTransitCount')) el('inTransitCount').textContent = all.filter(s => s.status === 'in-transit').length;
    if (el('deliveredCount')) el('deliveredCount').textContent = all.filter(s => s.status === 'delivered').length;
    if (el('processingCount')) el('processingCount').textContent = all.filter(s => s.status === 'processing' || s.status === 'customs').length;
};

const initAdmin = () => {
    renderTable();
    updateStats();

    const filterSelect = document.getElementById('filterSelect');
    if (filterSelect) {
        filterSelect.addEventListener('change', () => renderTable(filterSelect.value));
    }

    const addForm = document.getElementById('addShipmentForm');
    if (addForm) {
        addForm.addEventListener('submit', e => {
            e.preventDefault();
            const id = document.getElementById('newId') ? .value.trim().toUpperCase();
            const type = document.getElementById('newType') ? .value.trim();
            const origin = document.getElementById('newOrigin') ? .value.trim();
            const dest = document.getElementById('newDest') ? .value.trim();
            const status = document.getElementById('newStatus') ? .value;

            if (!id || !type || !origin || !dest || !status) {
                alert('All fields required.');
                return;
            }

            const all = getShipments();
            if (all.find(s => s.id === id)) {
                alert('Tracking ID already exists.');
                return;
            }

            all.unshift({ id, type, origin, destination: dest, status, date: new Date().toISOString().split('T')[0] });
            saveShipments(all);
            addForm.reset();
            renderTable(filterSelect ? .value || 'all');
            updateStats();

            // Flash success
            const msg = document.getElementById('addSuccess');
            if (msg) {
                msg.style.display = 'block';
                setTimeout(() => msg.style.display = 'none', 3000);
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', initAdmin);