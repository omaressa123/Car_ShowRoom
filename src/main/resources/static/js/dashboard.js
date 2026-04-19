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
                price: 50000.0 // Default sale price
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

// Pricing form with loading
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
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Price updated successfully',
                        timer: 2000
                    });
                    pricingForm.reset();
                    loadDashboardStats();
                } else {
                    const errorData = await response.json();
                    Swal.fire({
                        icon: 'error',
                        title: 'Update Failed',
                        text: errorData.message || response.statusText
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: error.message
                });
            } finally {
                submitBtn.innerHTML = 'Update Price';
                submitBtn.disabled = false;
            }
        });
    }

    // Cars table initialization
    if (typeof $('#carsTable').DataTable === 'function') {
        $('#carsTable').DataTable({
            ajax: {
                url: `${API_BASE_URL}/cars`,
                headers: getAuthHeaders()
            },
            columns: [
                { data: 'id' },
                { data: 'brand' },
                { data: 'model' },
                { data: 'year' },
                { data: 'branchName' },
                { data: 'price', render: (data) => '$' + Number(data).toLocaleString() },
                { data: 'status' },
                { 
                    data: null,
                    render: function (data) {
                        return `
                            <div class="btn-group" role="group">
                                <button class="btn btn-sm btn-warning" onclick="editCar(${data.id})"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-sm btn-danger" onclick="deleteCar(${data.id})"><i class="fas fa-trash"></i></button>
                            </div>
                        `;
                    }
                }
            ],
            pageLength: 25,
            responsive: true,
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
            dom: 'Bfrtip',
            buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
        });
    }
});

async function loadDashboardStats() {
    const statsContainer = document.getElementById('dashboard-stats');
    if (!statsContainer) return;

    Swal.fire({
        title: 'Loading Dashboard...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading()
    });

    try {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
            headers: getAuthHeaders()
        });
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
                                <h2 class="text-warning fw-bold">$${ (stats.totalRevenue || 0).toLocaleString()}</h2>
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
                    <div class="col-xl-2 col-md-4 col-6">
                        <div class="card border-0 shadow h-100">
                            <div class="card-body text-center">
                                <div class="h1 text-secondary mb-2"><i class="fas fa-building"></i></div>
                                <h5>Branches</h5>
                                <h2 class="text-secondary fw-bold">${stats.totalBranches || 0}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            Swal.close();
        } else {
            throw new Error(data.message || 'Failed to load stats');
        }
    } catch (error) {
        console.error('Failed to load stats:', error);
        Swal.fire({
            icon: 'error',
            title: 'Dashboard Load Failed',
            text: error.message
        });
    }
}
