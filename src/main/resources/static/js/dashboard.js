// Dashboard JS - Inventory & Pricing
document.addEventListener('DOMContentLoaded', () => {
    // Load Stats
    loadDashboardStats();

    // Inventory form
    const inventoryForm = document.getElementById('inventory-form');
    if (inventoryForm) {
        inventoryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                brand: document.getElementById('car-company').options[document.getElementById('car-company').selectedIndex].text,
                model: document.getElementById('car-model').value,
                year: parseInt(document.getElementById('car-year').value),
                branchId: parseInt(document.getElementById('car-branch').value),
                plateNumber: 'NEW-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
                pricePerDay: 50.0 // Default price
            };
            
            try {
                const response = await fetch(`${API_BASE_URL}/cars`, {
                    method: 'POST',
                    headers: getAuthHeaders(),
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    alert('Car added to inventory!');
                    inventoryForm.reset();
                    loadDashboardStats(); // Refresh stats
                } else {
                    const errorData = await response.json();
                    alert('Failed to add car: ' + (errorData.message || response.statusText));
                }
            } catch (error) {
                alert('Failed to add car: ' + error.message);
            }
        });
    }

    // Pricing form
    const pricingForm = document.getElementById('pricing-form');
    if (pricingForm) {
        pricingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const carId = document.getElementById('pricing-car').value;
            const price = document.getElementById('new-price').value;
            
            try {
                const response = await fetch(`${API_BASE_URL}/cars/${carId}/price?price=${price}`, {
                    method: 'PUT',
                    headers: getAuthHeaders()
                });
                if (response.ok) {
                    alert('Price updated!');
                    pricingForm.reset();
                } else {
                    alert('Failed to update price: ' + response.statusText);
                }
            } catch (error) {
                alert('Failed to update price: ' + error.message);
            }
        });
    }
});

async function loadDashboardStats() {
    const statsContainer = document.getElementById('dashboard-stats');
    if (!statsContainer) return;

    try {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
            headers: getAuthHeaders()
        });
        const data = await response.json();
        if (data.success) {
            const stats = data.data;
            statsContainer.innerHTML = `
                <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <div class="card" style="text-align: center; padding: 1rem; background: #f8f9fa;">
                        <h3>Total Cars</h3>
                        <p style="font-size: 2rem; font-weight: bold; color: #007bff;">${stats.totalCars}</p>
                    </div>
                    <div class="card" style="text-align: center; padding: 1rem; background: #f8f9fa;">
                        <h3>Available</h3>
                        <p style="font-size: 2rem; font-weight: bold; color: #28a745;">${stats.availableCars}</p>
                    </div>
                    <div class="card" style="text-align: center; padding: 1rem; background: #f8f9fa;">
                        <h3>Rented</h3>
                        <p style="font-size: 2rem; font-weight: bold; color: #dc3545;">${stats.rentedCars}</p>
                    </div>
                    <div class="card" style="text-align: center; padding: 1rem; background: #f8f9fa;">
                        <h3>Revenue</h3>
                        <p style="font-size: 2rem; font-weight: bold; color: #ffc107;">$${stats.totalRevenue.toFixed(2)}</p>
                    </div>
                    <div class="card" style="text-align: center; padding: 1rem; background: #f8f9fa;">
                        <h3>Pending</h3>
                        <p style="font-size: 2rem; font-weight: bold; color: #17a2b8;">${stats.pendingContracts}</p>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
}
