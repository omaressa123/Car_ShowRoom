/**
 * search.js — Cars page logic
 * - Loads ALL cars on page load
 * - Populates filter dropdowns from DB (company, color, branch)
 * - Filters on form submit (or reset)
 * - Active-filter pills for applied filters
 */

let allCarsCache = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadSearchOptions();
    renderSkeletons(6);             // show placeholders while fetching
    await loadAllCars();            // load all cars immediately

    // Search form submit
    document.getElementById('search-form').addEventListener('submit', e => {
        e.preventDefault();
        applyFilters();
    });

    // Reset button
    document.getElementById('reset-btn').addEventListener('click', () => {
        document.getElementById('search-form').reset();
        showActiveFilters({});
        renderCars(allCarsCache);
        updateResultsHeader(allCarsCache.length, {});
    });

    // Live-filter on select change (optional nice-to-have)
    ['filter-company', 'filter-color', 'filter-branch'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', () => applyFilters());
    });
});

// ── Populate dropdowns from /api/options ─────────────────────────────────

async function loadSearchOptions() {
    try {
        const options = await fetchDynamicOptions();

        // Companies (objects with id+name)
        fillSelect(
            document.getElementById('filter-company'),
            options.companies || [],
            c => c.name,          // value sent to API is the name string
            c => c.name,
            'All Companies'
        );

        // Colors (objects with id+name)
        fillSelect(
            document.getElementById('filter-color'),
            options.colors || [],
            c => c.name,
            c => c.name,
            'All Colors'
        );

        // Branches (objects with id+name+city)
        fillSelect(
            document.getElementById('filter-branch'),
            options.branches || [],
            b => b.name,
            b => `${b.name}${b.city ? `, ${b.city}` : ''}`,
            'All Branches'
        );
    } catch (err) {
        console.error('Failed to load search options:', err);
    }
}

// ── Load all cars from the API ────────────────────────────────────────────

async function loadAllCars() {
    try {
        const response = await fetch(`${API_BASE_URL}/cars`, {
            headers: getAuthHeaders()
        });
        const data = await response.json();
        if (data.success && data.data) {
            allCarsCache = data.data;
            renderCars(allCarsCache);
            updateResultsHeader(allCarsCache.length, {});
        } else {
            throw new Error(data.message || 'Failed to load cars');
        }
    } catch (err) {
        showError(err.message);
    }
}

// ── Apply current filter values ───────────────────────────────────────────

function applyFilters() {
    const filters = {
        company: document.getElementById('filter-company').value.trim(),
        model:   document.getElementById('filter-model').value.trim(),
        color:   document.getElementById('filter-color').value.trim(),
        branch:  document.getElementById('filter-branch').value.trim()
    };

    // Client-side filter on the cached data for instant response
    const filtered = allCarsCache.filter(car => {
        if (filters.company && car.brand?.toLowerCase() !== filters.company.toLowerCase()) return false;
        if (filters.model && !car.model?.toLowerCase().includes(filters.model.toLowerCase())) return false;
        if (filters.color) {
            const hasColor = (car.colors || []).some(c => c.toLowerCase() === filters.color.toLowerCase());
            if (!hasColor) return false;
        }
        if (filters.branch && car.branchName?.toLowerCase() !== filters.branch.toLowerCase()) return false;
        return true;
    });

    renderCars(filtered);
    updateResultsHeader(filtered.length, filters);
    showActiveFilters(filters);
}

// ── Render car grid ───────────────────────────────────────────────────────

function renderSkeletons(count) {
    const results = document.getElementById('car-results');
    if (!results) return;
    results.innerHTML = Array.from({ length: count }, () => `
        <div class="col-lg-4 col-md-6">
            <div class="car-card p-0" style="background:#fff;">
                <div class="skeleton" style="height:210px;border-radius:16px 16px 0 0;"></div>
                <div style="padding:1.25rem;">
                    <div class="skeleton" style="height:18px;width:60%;margin-bottom:.6rem;"></div>
                    <div class="skeleton" style="height:13px;width:40%;margin-bottom:.8rem;"></div>
                    <div class="skeleton" style="height:13px;width:80%;margin-bottom:.5rem;"></div>
                    <div class="skeleton" style="height:24px;width:45%;margin-bottom:.9rem;"></div>
                    <div class="skeleton" style="height:36px;border-radius:10px;"></div>
                </div>
            </div>
        </div>
    `).join('');
    document.getElementById('results-count').textContent = 'Loading...';
}

function renderCars(cars) {
    const results = document.getElementById('car-results');
    if (!results) return;

    if (!cars.length) {
        results.innerHTML = `
            <div class="empty-state col-12">
                <i class="fas fa-car-side"></i>
                <h3>No Cars Found</h3>
                <p>Try adjusting your filters or <button class="btn btn-link p-0" style="font-size:inherit" onclick="document.getElementById('reset-btn').click()">reset all filters</button>.</p>
            </div>`;
        return;
    }

    results.innerHTML = cars.map(car => {
        const imageHtml = car.imageUrls && car.imageUrls.length > 0
            ? `<img src="${car.imageUrls[0]}" alt="${car.brand} ${car.model}" loading="lazy"
                    onerror="this.parentElement.innerHTML='<div class=\\'car-image-placeholder\\'><i class=\\'fas fa-car fa-3x\\'></i><span>${car.brand}</span></div>'">`
            : `<div class="car-image-placeholder">
                    <i class="fas fa-car fa-3x"></i>
                    <span>${car.brand || 'Car'}</span>
               </div>`;

        const colorSwatches = (car.colors && car.colors.length > 0)
            ? car.colors.slice(0, 5).map(c => `
                <span class="color-swatch" title="${c}">
                    <span class="color-dot-sm" style="background:${cssColor(c)};"></span>${c}
                </span>`).join('')
            : '';

        return `
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="car-card">
                <div class="car-image-wrap">
                    ${imageHtml}
                    <span class="car-badge"><i class="fas fa-circle-check me-1"></i>Available</span>
                </div>
                <div class="car-body">
                    <div class="car-title">${car.brand || ''} ${car.model || ''}</div>
                    <div class="car-subtitle">${car.year || ''} &bull; ${car.branchName || ''}</div>
                    <div class="car-meta">
                        <span class="meta-chip"><i class="fas fa-calendar-alt"></i>${car.year}</span>
                        <span class="meta-chip"><i class="fas fa-boxes-stacked"></i>${car.quantityAvailable} in stock</span>
                        <span class="meta-chip"><i class="fas fa-location-dot"></i>${car.branchName || 'N/A'}</span>
                    </div>
                    ${colorSwatches ? `<div class="car-meta">${colorSwatches}</div>` : ''}
                    <div class="car-price">
                        $${Number(car.price || 0).toLocaleString()}
                        <small>/ unit</small>
                    </div>
                    <a class="btn-view" href="/car-details?carId=${car.id}">
                        <i class="fas fa-circle-info me-1"></i>View Details &amp; Buy
                    </a>
                </div>
            </div>
        </div>`;
    }).join('');
}

// ── UI helpers ────────────────────────────────────────────────────────────

function updateResultsHeader(count, filters) {
    const title = document.getElementById('results-title');
    const badge = document.getElementById('results-count');
    const hasFilter = Object.values(filters).some(v => v);
    if (title) title.textContent = hasFilter ? 'Search Results' : 'All Available Cars';
    if (badge) badge.textContent = `${count} car${count !== 1 ? 's' : ''} found`;
}

function showActiveFilters(filters) {
    const container = document.getElementById('active-filters');
    if (!container) return;
    const active = Object.entries(filters).filter(([, v]) => v);
    if (!active.length) { container.innerHTML = ''; return; }

    const labels = { company: 'Company', model: 'Model', color: 'Color', branch: 'Branch' };
    container.innerHTML = active.map(([key, val]) => `
        <span class="filter-pill">
            ${labels[key] || key}: <strong>${val}</strong>
            <button onclick="clearFilter('${key}')" title="Remove filter">&times;</button>
        </span>
    `).join('');
}

function clearFilter(key) {
    const el = document.getElementById(`filter-${key}`);
    if (el) { el.tagName === 'SELECT' ? el.value = '' : el.value = ''; }
    applyFilters();
}

function showError(msg) {
    const results = document.getElementById('car-results');
    if (results) {
        results.innerHTML = `
            <div class="empty-state col-12">
                <i class="fas fa-triangle-exclamation" style="color:#ef4444;opacity:.7;"></i>
                <h3>Failed to Load Cars</h3>
                <p>${msg}</p>
                <button class="btn btn-primary mt-2" onclick="location.reload()">Try Again</button>
            </div>`;
    }
    const badge = document.getElementById('results-count');
    if (badge) badge.textContent = 'Error';
}

/** Maps common color names to CSS colors for the swatches */
function cssColor(name) {
    const map = {
        black: '#111827', white: '#f9fafb', silver: '#cbd5e1', red: '#ef4444',
        blue: '#3b82f6', grey: '#6b7280', gray: '#6b7280', green: '#22c55e',
        yellow: '#eab308', orange: '#f97316', brown: '#92400e', purple: '#a855f7',
        pink: '#ec4899', gold: '#ca8a04', beige: '#d6c8a5'
    };
    return map[name.toLowerCase()] || '#94a3b8';
}
