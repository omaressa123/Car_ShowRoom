/**
 * Handle Rental Contract Creation (UC-08)
 */
async function createRentalContract(contractData) {
    try {
        const response = await fetch(`${API_BASE_URL}/contracts`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(contractData)
        });

        const data = await response.json();
        if (data.success) {
            showAlert('alert-success', 'Contract successfully created!');
            const modal = document.getElementById('booking-modal');
            if (modal) modal.style.display = 'none';
            // Refresh car list to reflect availability change
            if (typeof searchCars === 'function') {
                searchCars({});
            }
        } else {
            throw new Error(data.message || 'Contract creation failed');
        }
    } catch (error) {
        showAlert('alert-error', error.message);
    }
}

/**
 * Handle Booking Modal UI
 */
function openBookingModal(carId) {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.style.display = 'flex';
        modal.setAttribute('data-car-id', carId);
    }
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) modal.style.display = 'none';
}
