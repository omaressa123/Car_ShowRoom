// Dashboard JS - Inventory, Pricing, Company & Color Management
document.addEventListener('DOMContentLoaded', async () => {
    await loadDashboardOptions();
    loadDashboardStats();
    loadPendingContracts();
    loadDashboardAnalytics();
    loadCompanies();
    loadColors();
    populatePricingCars();

    // ── Inventory form ──────────────────────────────────────────────────────
    const inventoryForm = document.getElementById('inventory-form');
    if (inventoryForm) {
        inventoryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('add-car-btn');
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Adding...';

            const imageUrls = document.getElementById('car-images').value
                .split(/\r?\n/)
                .map(url => url.trim())
                .filter(url => url.length > 0);

            // Collect selected color IDs from chips
            const colorIds = getSelectedColorIds();

            const companySelect = document.getElementById('car-company');
            const formData = {
                companyId: parseInt(companySelect.value),
                model: document.getElementById('car-model').value,
                year: parseInt(document.getElementById('car-year').value),
                branchId: parseInt(document.getElementById('car-branch').value),
                price: parseFloat(document.getElementById('car-price').value),
                quantityAvailable: parseInt(document.getElementById('car-quantity').value, 10),
                colorIds,
                imageUrls
            };

            try {
                const response = await fetch(`${API_BASE_URL}/cars`, {
                    method: 'POST',
                    headers: getAuthHeaders(),
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                if (response.ok && data.success) {
                    Swal.fire({ icon: 'success', title: 'Car added!', timer: 1500, showConfirmButton: false });
                    inventoryForm.reset();
                    clearSelectedColors();
                    loadDashboardStats();
                    populatePricingCars();
                } else {
                    Swal.fire({ icon: 'error', title: 'Failed', text: data.message || response.statusText });
                }
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Error', text: error.message });
            } finally {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-plus me-1"></i>Add Car';
            }
        });
    }

    // ── Pricing form ────────────────────────────────────────────────────────
    const pricingForm = document.getElementById('pricing-form');
    if (pricingForm) {
        pricingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = e.target.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Updating...';
            submitBtn.disabled = true;

            const carId = document.getElementById('pricing-car').value;
            const price = document.getElementById('new-price').value;

            try {
                const response = await fetch(`${API_BASE_URL}/cars/${carId}/price?price=${price}`, {
                    method: 'PUT',
                    headers: getAuthHeaders()
                });
                const data = await response.json();
                if (response.ok && data.success) {
                    Swal.fire({ icon: 'success', title: 'Success!', text: 'Price updated', timer: 2000 });
                    pricingForm.reset();
                    loadDashboardStats();
                } else {
                    Swal.fire({ icon: 'error', title: 'Update Failed', text: data.message || response.statusText });
                }
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Update Failed', text: error.message });
            } finally {
                submitBtn.innerHTML = 'Update Price';
                submitBtn.disabled = false;
            }
        });
    }

    // ── Cars DataTable ───────────────────────────────────────────────────────
    if (typeof $.fn.DataTable === 'function') {
        $('#carsTable').DataTable({
            ajax: {
                url: `${API_BASE_URL}/cars`,
                headers: getAuthHeaders(),
                dataSrc: (json) => json.data || []
            },
            columns: [
                { data: 'id' },
                { data: 'brand' },
                { data: 'model' },
                { data: 'year' },
                { data: 'branchName' },
                { data: 'price', render: (d) => '$' + Number(d).toLocaleString() },
                { data: 'status' },
                {
                    data: null,
                    render: (data) => `
                        <div class="btn-group" role="group">
                            <button class="btn btn-sm btn-danger" onclick="deleteCar(${data.id})"><i class="fas fa-trash"></i></button>
                        </div>`
                }
            ],
            pageLength: 25,
            responsive: true,
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
            dom: 'Bfrtip',
            buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
        });
    }
});

// ── Load all options into Add-Car form ─────────────────────────────────────

async function loadDashboardOptions() {
    try {
        const options = await fetchDynamicOptions();

        // Companies dropdown (value = id)
        fillSelect(
            document.getElementById('car-company'),
            options.companies || [],
            c => c.id,
            c => c.name,
            options.companies && options.companies.length ? 'Select Company' : 'No Companies – add one below'
        );

        // Branch dropdown
        fillSelect(
            document.getElementById('car-branch'),
            options.branches || [],
            b => b.id,
            b => `${b.name}${b.city ? `, ${b.city}` : ''}`,
            options.branches && options.branches.length ? 'Select Branch' : 'No Branches In Database'
        );

        // Color chips
        renderColorChips(options.colors || []);
    } catch (error) {
        console.error('Failed to load dashboard options:', error);
    }
}

// ── Color chip picker ──────────────────────────────────────────────────────

function renderColorChips(colors) {
    const container = document.getElementById('color-chips-container');
    if (!container) return;
    if (!colors.length) {
        container.innerHTML = '<span class="text-muted" style="font-size:0.85rem;">No colors in database – add some below.</span>';
        return;
    }
    container.innerHTML = colors.map(c => `
        <span class="color-chip" data-color-id="${c.id}" data-color-name="${c.name}" onclick="toggleColorChip(this)">
            ${c.name}
        </span>
    `).join('');
}

function toggleColorChip(el) {
    el.classList.toggle('selected');
}

function getSelectedColorIds() {
    return Array.from(document.querySelectorAll('.color-chip.selected'))
        .map(el => parseInt(el.dataset.colorId));
}

function clearSelectedColors() {
    document.querySelectorAll('.color-chip.selected').forEach(el => el.classList.remove('selected'));
}

// ── Populate pricing car select from API ──────────────────────────────────

async function populatePricingCars() {
    const select = document.getElementById('pricing-car');
    if (!select) return;
    try {
        const response = await fetch(`${API_BASE_URL}/cars`, { headers: getAuthHeaders() });
        const data = await response.json();
        const cars = data.data || [];
        select.innerHTML = '<option value="">Select Car</option>' +
            cars.map(c => `<option value="${c.id}">${c.brand} ${c.model} (${c.year}) – $${Number(c.price).toLocaleString()}</option>`).join('');
    } catch (e) {
        console.error('Failed to load cars for pricing:', e);
    }
}

// ── deleteCar (called from DataTable) ────────────────────────────────────

async function deleteCar(id) {
    const confirmed = await Swal.fire({
        icon: 'warning',
        title: 'Delete car?',
        text: 'This cannot be undone.',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#ef4444'
    });
    if (!confirmed.isConfirmed) return;
    try {
        const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        const data = await response.json();
        if (data.success) {
            Swal.fire({ icon: 'success', title: 'Deleted', timer: 1200, showConfirmButton: false });
            loadCarsTable();
            loadDashboardStats();
            populatePricingCars();
        } else {
            Swal.fire({ icon: 'error', title: 'Error', text: data.message });
        }
    } catch (e) {
        Swal.fire({ icon: 'error', title: 'Error', text: e.message });
    }
}

// ── Company management ─────────────────────────────────────────────────────

async function loadCompanies() {
    const list = document.getElementById('companies-list');
    const count = document.getElementById('companies-count');
    if (!list) return;
    try {
        const response = await fetch(`${API_BASE_URL}/companies`, { headers: getAuthHeaders() });
        const data = await response.json();
        const companies = data.data || [];
        if (count) count.textContent = companies.length;
        if (!companies.length) {
            list.innerHTML = '<div class="text-muted text-center py-2">No companies yet. Add one above.</div>';
            return;
        }
        list.innerHTML = companies.map(c => `
            <div class="manage-list-item">
                <span><i class="fas fa-building me-2 text-primary"></i>${c.name}</span>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteCompany(${c.id}, '${escapeHtml(c.name)}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    } catch (e) {
        list.innerHTML = `<div class="text-danger">Failed to load: ${e.message}</div>`;
    }
}

async function addCompany() {
    const input = document.getElementById('new-company-name');
    const name = input.value.trim();
    if (!name) { input.focus(); return; }
    try {
        const response = await fetch(`${API_BASE_URL}/companies`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ name })
        });
        const data = await response.json();
        if (data.success) {
            input.value = '';
            await loadCompanies();
            await loadDashboardOptions(); // refresh Add-Car dropdown
            Swal.fire({ icon: 'success', title: `'${name}' added`, timer: 1200, showConfirmButton: false });
        } else {
            Swal.fire({ icon: 'warning', title: 'Could not add', text: data.message });
        }
    } catch (e) {
        Swal.fire({ icon: 'error', title: 'Error', text: e.message });
    }
}

async function deleteCompany(id, name) {
    const confirmed = await Swal.fire({
        icon: 'warning',
        title: `Delete '${name}'?`,
        text: 'Cars linked to this company will lose their company reference.',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#ef4444'
    });
    if (!confirmed.isConfirmed) return;
    try {
        const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        const data = await response.json();
        if (data.success) {
            await loadCompanies();
            await loadDashboardOptions();
            Swal.fire({ icon: 'success', title: 'Deleted', timer: 1200, showConfirmButton: false });
        } else {
            Swal.fire({ icon: 'error', title: 'Error', text: data.message });
        }
    } catch (e) {
        Swal.fire({ icon: 'error', title: 'Error', text: e.message });
    }
}

// ── Color management ───────────────────────────────────────────────────────

async function loadColors() {
    const list = document.getElementById('colors-list');
    const count = document.getElementById('colors-count');
    if (!list) return;
    try {
        const response = await fetch(`${API_BASE_URL}/colors`, { headers: getAuthHeaders() });
        const data = await response.json();
        const colors = data.data || [];
        if (count) count.textContent = colors.length;
        if (!colors.length) {
            list.innerHTML = '<div class="text-muted text-center py-2">No colors yet. Add one above.</div>';
            return;
        }
        list.innerHTML = colors.map(c => `
            <div class="manage-list-item">
                <span>
                    <span class="color-dot" style="background-color: ${cssColorName(c.name)};"></span>
                    ${c.name}
                </span>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteColor(${c.id}, '${escapeHtml(c.name)}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    } catch (e) {
        list.innerHTML = `<div class="text-danger">Failed to load: ${e.message}</div>`;
    }
}

async function addColor() {
    const input = document.getElementById('new-color-name');
    const name = input.value.trim();
    if (!name) { input.focus(); return; }
    try {
        const response = await fetch(`${API_BASE_URL}/colors`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ name })
        });
        const data = await response.json();
        if (data.success) {
            input.value = '';
            await loadColors();
            await loadDashboardOptions(); // refresh color chips in Add-Car form
            Swal.fire({ icon: 'success', title: `'${name}' added`, timer: 1200, showConfirmButton: false });
        } else {
            Swal.fire({ icon: 'warning', title: 'Could not add', text: data.message });
        }
    } catch (e) {
        Swal.fire({ icon: 'error', title: 'Error', text: e.message });
    }
}

async function deleteColor(id, name) {
    const confirmed = await Swal.fire({
        icon: 'warning',
        title: `Delete '${name}'?`,
        text: 'This color will be removed from all cars.',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#ef4444'
    });
    if (!confirmed.isConfirmed) return;
    try {
        const response = await fetch(`${API_BASE_URL}/colors/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        const data = await response.json();
        if (data.success) {
            await loadColors();
            await loadDashboardOptions();
            Swal.fire({ icon: 'success', title: 'Deleted', timer: 1200, showConfirmButton: false });
        } else {
            Swal.fire({ icon: 'error', title: 'Error', text: data.message });
        }
    } catch (e) {
        Swal.fire({ icon: 'error', title: 'Error', text: e.message });
    }
}

// ── Helpers ────────────────────────────────────────────────────────────────

/** Try to resolve a CSS color from a common name, fall back to #aaa */
function cssColorName(name) {
    const map = {
        black: '#111', white: '#f5f5f5', silver: '#c0c0c0', red: '#e53e3e',
        blue: '#3182ce', grey: '#718096', gray: '#718096', green: '#38a169',
        yellow: '#d69e2e', orange: '#dd6b20', brown: '#744210',
        purple: '#805ad5', pink: '#d53f8c', gold: '#b7791f', beige: '#f5deb3'
    };
    return map[name.toLowerCase()] || name.toLowerCase();
}

function escapeHtml(str) {
    return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ── Charts ─────────────────────────────────────────────────────────────────

let salesStatusChart;
let availableUnitsChart;

async function loadDashboardAnalytics() {
    const salesEl = document.getElementById('salesStatusChart');
    const unitsEl = document.getElementById('availableUnitsChart');
    if (!salesEl || !unitsEl || typeof Chart === 'undefined') return;

    try {
        const response = await fetch(`${API_BASE_URL}/dashboard/analytics`, { headers: getAuthHeaders() });
        const payload = await response.json();
        if (!payload.success) throw new Error(payload.message || 'Failed to load analytics');

        const a = payload.data;
        document.getElementById('approved-sales-percent').textContent =
            `Approved sales: ${Number(a.approvedSalesPercent || 0).toFixed(1)}%`;
        document.getElementById('customers-purchased-count').textContent =
            `Customers who purchased: ${a.customersWhoPurchased || 0}`;
        document.getElementById('available-units-total').textContent =
            `Total units available: ${a.availableUnits || 0}`;

        if (salesStatusChart) salesStatusChart.destroy();
        salesStatusChart = new Chart(salesEl, {
            type: 'doughnut',
            data: {
                labels: ['Pending', 'Approved', 'Cancelled'],
                datasets: [{ data: [a.pendingSales || 0, a.approvedSales || 0, a.cancelledSales || 0],
                    backgroundColor: ['#f59e0b', '#22c55e', '#ef4444'] }]
            },
            options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        });

        if (availableUnitsChart) availableUnitsChart.destroy();
        availableUnitsChart = new Chart(unitsEl, {
            type: 'bar',
            data: {
                labels: a.branchNames || [],
                datasets: [{ label: 'Available units', data: a.availableUnitsByBranch || [],
                    backgroundColor: '#3b82f6' }]
            },
            options: { responsive: true, plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } } }
        });
    } catch (error) {
        console.error('Failed to load analytics:', error);
    }
}

function loadCarsTable() {
    if (typeof $ !== 'function') return;
    const dt = $.fn.DataTable && $('#carsTable').DataTable?.();
    if (dt && typeof dt.ajax?.reload === 'function') {
        dt.ajax.reload(null, false);
    }
}

// ── Pending Contracts ──────────────────────────────────────────────────────

async function loadPendingContracts() {
    const tableBody = document.querySelector('#contractsTable tbody');
    if (!tableBody) return;
    try {
        const response = await fetch(`${API_BASE_URL}/admin/contracts/pending`, { headers: getAuthHeaders() });
        const data = await response.json();
        if (!data.success) throw new Error(data.message || 'Failed to load pending contracts');
        const rows = (data.data || []).map(c => {
            const carName = `${c.brand || ''} ${c.model || ''} (${c.year || ''})`.trim();
            return `
                <tr>
                    <td>${c.id}</td>
                    <td>${c.username || '-'}</td>
                    <td>${c.customerName || '-'}</td>
                    <td>${carName}</td>
                    <td>${c.branchName || '-'}</td>
                    <td>$${Number(c.totalPrice || 0).toLocaleString()}</td>
                    <td><small class="text-muted">${c.ssn || '-'}</small></td>
                    <td>
                        ${c.idPhotoUrl ? `<a href="${c.idPhotoUrl}" target="_blank" class="btn btn-sm btn-outline-info"><i class="fas fa-image"></i> View ID</a>` : '-'}
                    </td>
                    <td>${c.quantityAvailable ?? '-'}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <button class="btn btn-sm btn-success" onclick="approveContract(${c.id})">Approve</button>
                            <button class="btn btn-sm btn-danger" onclick="rejectContract(${c.id})">Reject</button>
                        </div>
                    </td>
                </tr>`;
        }).join('');
        tableBody.innerHTML = rows || `<tr><td colspan="8" class="text-center text-muted">No pending contracts</td></tr>`;
    } catch (error) {
        tableBody.innerHTML = `<tr><td colspan="8" class="text-center text-danger">${error.message}</td></tr>`;
    }
}

async function approveContract(contractId) {
    const confirmed = await Swal.fire({
        icon: 'question', title: 'Approve purchase?',
        text: 'This will finalize the purchase and decrease inventory.',
        showCancelButton: true, confirmButtonText: 'Approve'
    });
    if (!confirmed.isConfirmed) return;
    try {
        const response = await fetch(`${API_BASE_URL}/admin/contracts/${contractId}/approve`, {
            method: 'POST', headers: getAuthHeaders()
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.message || 'Approve failed');
        Swal.fire({ icon: 'success', title: 'Approved', timer: 1500, showConfirmButton: false });
        loadPendingContracts();
        loadDashboardStats();
        loadCarsTable();
    } catch (error) {
        Swal.fire({ icon: 'error', title: 'Approve Failed', text: error.message });
    }
}

async function rejectContract(contractId) {
    const confirmed = await Swal.fire({
        icon: 'warning', title: 'Reject purchase?',
        text: 'The contract will be cancelled.',
        showCancelButton: true, confirmButtonText: 'Reject'
    });
    if (!confirmed.isConfirmed) return;
    try {
        const response = await fetch(`${API_BASE_URL}/admin/contracts/${contractId}/reject`, {
            method: 'POST', headers: getAuthHeaders()
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.message || 'Reject failed');
        Swal.fire({ icon: 'success', title: 'Rejected', timer: 1500, showConfirmButton: false });
        loadPendingContracts();
        loadDashboardStats();
    } catch (error) {
        Swal.fire({ icon: 'error', title: 'Reject Failed', text: error.message });
    }
}

// ── Dashboard Stats ────────────────────────────────────────────────────────

async function loadDashboardStats() {
    const statsContainer = document.getElementById('dashboard-stats');
    if (!statsContainer) return;
    Swal.fire({ title: 'Loading Dashboard...', allowOutsideClick: false, showConfirmButton: false,
        didOpen: () => Swal.showLoading() });
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`, { headers: getAuthHeaders() });
        const data = await response.json();
        if (data.success) {
            const stats = data.data;
            statsContainer.innerHTML = `
                <div class="row g-4 mb-5">
                    <div class="col-xl-2 col-md-4 col-6">
                        <div class="card border-0 shadow h-100">
                            <div class="card-body text-center">
                                <div class="h1 text-primary mb-2"><i class="fas fa-car"></i></div>
                                <h5>Total Cars</h5>
                                <h2 class="text-primary fw-bold">${stats.totalCars || 0}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-md-4 col-6">
                        <div class="card border-0 shadow h-100">
                            <div class="card-body text-center">
                                <div class="h1 text-success mb-2"><i class="fas fa-check-circle"></i></div>
                                <h5>Available</h5>
                                <h2 class="text-success fw-bold">${stats.availableCars || 0}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-md-4 col-6">
                        <div class="card border-0 shadow h-100">
                            <div class="card-body text-center">
                                <div class="h1 text-danger mb-2"><i class="fas fa-shopping-cart"></i></div>
                                <h5>Sold</h5>
                                <h2 class="text-danger fw-bold">${stats.soldCars || stats.rentedCars || 0}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-md-4 col-6">
                        <div class="card border-0 shadow h-100">
                            <div class="card-body text-center">
                                <div class="h1 text-warning mb-2"><i class="fas fa-dollar-sign"></i></div>
                                <h5>Revenue</h5>
                                <h2 class="text-warning fw-bold">$${(stats.totalRevenue || 0).toLocaleString()}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-md-4 col-6">
                        <div class="card border-0 shadow h-100">
                            <div class="card-body text-center">
                                <div class="h1 text-info mb-2"><i class="fas fa-clock"></i></div>
                                <h5>Pending</h5>
                                <h2 class="text-info fw-bold">${stats.pendingContracts || 0}</h2>
                            </div>
                        </div>
                    </div>
                </div>`;
            Swal.close();
        } else {
            throw new Error(data.message || 'Failed to load stats');
        }
    } catch (error) {
        console.error('Failed to load stats:', error);
        Swal.fire({ icon: 'error', title: 'Dashboard Load Failed', text: error.message });
    }
}
