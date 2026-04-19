async function searchCars(filters) {
    const loading = document.getElementById('loading');
    const results = document.getElementById('car-results');
    const searchBtn = document.getElementById('search-btn');

    // Show enhanced loading
    Swal.fire({
        title: 'Searching cars...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        const queryParams = new URLSearchParams(filters).toString();

        const response = await fetch(
            `${API_BASE_URL}/cars?${queryParams}`,
            { headers: getAuthHeaders() }
        );

        const data = await response.json();

        if (data.success && data.data) {
            renderCars(data.data);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: `${data.data.length} car(s) found`,
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false
            });
        } else {
            throw new Error(data.message || 'No cars found');
        }

    } catch (error) {
        console.error('Search error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Search Failed',
            text: error.message
        });

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
        <div class="col-lg-4 col-md-6">
            <div class="card h-100 shadow-sm border-0 hover-lift">
                <div class="card-body d-flex flex-column">
                    <div class="text-center mb-3">
                        <i class="fas fa-car-side fa-3x text-primary mb-2"></i>
                    </div>
                    <h5 class="card-title">${car.brand} ${car.model}</h5>
                    <p class="card-text text-muted mb-1">Year: ${car.year}</p>
                    <p class="card-text text-muted mb-3">📍 ${car.branchName || 'Main Branch'}</p>
                    <p class="fs-3 fw-bold text-success mb-4">$${Number(car.price || 0).toLocaleString()}</p>
                    <button class="btn btn-primary w-100 mt-auto" onclick="openPurchaseModal(${car.id}, {
                        brand: '${car.brand || ''}',
                        model: '${car.model || ''}',
                        year: ${car.year || ''},
                        price: ${car.price || 0}
                    })">
                        <i class="fas fa-shopping-cart me-2"></i>Buy This Car
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function showToast(type, message) {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            popup: 'swal-toast'
        }
    });
}
