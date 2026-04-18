async function searchCars(filters) {
    const loading = document.getElementById('loading');
    const results = document.getElementById('car-results');
    const searchBtn = document.getElementById('search-btn');

    // Show loading state
    if (loading) loading.style.display = 'flex';
    if (results) results.style.opacity = '0.4';

    if (searchBtn) {
        searchBtn.disabled = true;
        searchBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm"></span>
            Searching...
        `;
    }

    try {
        const queryParams = new URLSearchParams(filters).toString();

        const response = await fetch(
            `${API_BASE_URL}/cars?${queryParams}`,
            { headers: getAuthHeaders() }
        );

        const data = await response.json();

        if (data.success) {
            renderCars(data.data);

            showToast(
                'success',
                `${data.data.length} car(s) found successfully`
            );

        } else {
            throw new Error(data.message || 'Failed to fetch cars');
        }

    } catch (error) {
        console.error('Search error:', error);

        showToast('error', error.message);

    } finally {
        if (loading) loading.style.display = 'none';
        if (results) results.style.opacity = '1';

        if (searchBtn) {
            searchBtn.disabled = false;
            searchBtn.innerHTML = `Search`;
        }
    }
}

function renderCars(cars) {
    const results = document.getElementById('car-results');
    if (!results) return;

    if (cars.length === 0) {
        results.innerHTML = `
            <div class="empty-state">
                <h3>No Cars Found 🚗</h3>
                <p>Try changing filters or dates.</p>
            </div>
        `;
        return;
    }

    results.innerHTML = cars.map(car => `
        <div class="card car-card shadow-sm">
            <div class="card-body">
                <h3>${car.brand} ${car.model} (${car.year})</h3>
                <p class="price">$${car.pricePerDay} / day</p>
                <p>📍 ${car.branchName || 'Main Branch'}</p>

                <button class="btn btn-primary w-100"
                    onclick="rentCar(${car.id})">
                    Rent This Car
                </button>
            </div>
        </div>
    `).join('');
}

function rentCar(id) {
    showToast('success', 'Redirecting to booking page...');
    setTimeout(() => {
        window.location.href = `/rent?carId=${id}`;
    }, 800);
}

function showToast(type, message) {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
    });
}