/**
 * Handle Car Search (UC-07)
 */
async function searchCars(filters) {
    const loading = document.getElementById('loading');
    const results = document.getElementById('car-results');
    
    if (loading) loading.style.display = 'block';
    if (results) results.style.opacity = '0.3';

    try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_BASE_URL}/cars?${queryParams}`, { headers: getAuthHeaders() });
        
        const data = await response.json();
        if (data.success) {
            renderCars(data.data);
        } else {
            throw new Error(data.message || 'Failed to fetch cars');
        }
    } catch (error) {
        console.error('Search error:', error);
        showAlert('alert-error', error.message);
    } finally {
        if (loading) loading.style.display = 'none';
        if (results) results.style.opacity = '1';
    }
}

function renderCars(cars) {
    const results = document.getElementById('car-results');
    if (!results) return;

    if (cars.length === 0) {
        results.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">No cars found. Try different filters.</p>';
        return;
    }

    results.innerHTML = cars.map(car => `
        <div class="card car-card">
            <h3>${car.brand} ${car.model} (${car.year})</h3>
            <p class="price">$${car.pricePerDay} / day</p>
            <p>Location: ${car.branchName || 'Main Branch'}</p>
            <button class="btn btn-primary book-btn" onclick="window.location.href='/rent?carId=${car.id}'">Rent This Car</button>
        </div>
    `).join('');
}
