/**
 * Car Sale Module
 */

async function loadPurchaseHistory() {
    const historyList = document.getElementById('history-list');
    const loading = document.getElementById('history-loading');
    const empty = document.getElementById('history-empty');
    
    if (!historyList) return;

    try {
        const response = await fetch(`${API_BASE_URL}/my/contracts`, {
            headers: getAuthHeaders()
        });
        const data = await response.json();
        
        if (loading) loading.style.display = 'none';
        
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            if (empty) empty.style.display = 'none';
            historyList.innerHTML = data.data.map(contract => renderContractCard(contract)).join('');
        } else {
            if (empty) empty.style.display = 'block';
            historyList.innerHTML = '';
        }
    } catch (error) {
        console.error('Failed to load purchase history:', error);
        if (loading) loading.style.display = 'none';
        if (historyList) historyList.innerHTML = '<div class="alert alert-danger">Failed to load history. Please try again later.</div>';
    }
}

function renderContractCard(c) {
    const statusClass = `status-${c.status.toLowerCase()}`;
    const carName = `${c.brand || 'Unknown Car'} ${c.model || ''}`;
    const imgUrl = (c.imageUrls && c.imageUrls.length > 0) ? c.imageUrls[0] : 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=400&q=80';

    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="purchase-card card">
                <img src="${imgUrl}" class="purchase-car-img" alt="${carName}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title fw-bold mb-0">${carName}</h5>
                        <span class="status-badge ${statusClass}">${c.status}</span>
                    </div>
                    <p class="text-muted small mb-3">${c.year || ''} | ${c.branchName || 'Main Branch'}</p>
                    
                    <div class="border-top pt-3 mt-2">
                        <div class="d-flex justify-content-between mb-1">
                            <span class="text-muted small">Total Price:</span>
                            <span class="fw-bold text-success">$${Number(c.totalPrice || 0).toLocaleString()}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-1">
                            <span class="text-muted small">Payment:</span>
                            <span class="small">${c.paymentMethod?.replaceAll('_', ' ')}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span class="text-muted small">Order ID:</span>
                            <span class="small">#${c.id}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function confirmPurchase() {
    const token = localStorage.getItem('car_showroom_token');
    if (!token || token === 'null' || token === 'undefined' || token.trim() === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Login required',
            text: 'Please login before making a purchase.'
        }).then(() => {
            window.location.href = '/login';
        });
        return;
    }

    const carIdInput = document.getElementById('car-id');
    const carId = carIdInput ? parseInt(carIdInput.value, 10) : null;

    if (!carId || isNaN(carId)) {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Invalid car selection.' });
        return;
    }

    const customerName = document.getElementById('customer-name')?.value.trim();
    const phone = document.getElementById('customer-phone')?.value.trim();
    const email = document.getElementById('customer-email')?.value.trim();
    const ssn = document.getElementById('customer-ssn')?.value.trim();
    const idPhotoUrl = document.getElementById('id-photo-url')?.value.trim();
    const paymentMethod = document.getElementById('payment-method')?.value;

    if (!customerName || !phone || !paymentMethod || !ssn || !idPhotoUrl) {
        Swal.fire({ icon: 'error', title: 'Missing Data', text: 'Please fill all required fields including SSN and ID Photo' });
        return;
    }

    const payload = {
        carId,
        customerName,
        phone,
        email,
        ssn,
        idPhotoUrl,
        paymentMethod
    };

    const btn = document.getElementById('confirm-purchase-btn');

    try {
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processing...';
        }

        const response = await fetch(`${API_BASE_URL}/purchases`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Purchase Request Sent!',
                text: 'Your request is pending approval. You can track it in My Purchases.',
                timer: 3000
            }).then(() => {
                window.location.href = '/purchase'; // Refresh to show history
            });
        } else {
            let errorMsg = data.message || 'Purchase failed';
            if (data.errors) {
                errorMsg += ':\n' + Object.entries(data.errors).map(([field, msg]) => `• ${field}: ${msg}`).join('\n');
            }
            Swal.fire({
                icon: 'error',
                title: 'Request Failed',
                text: errorMsg
            });
        }
    } catch (error) {
        Swal.fire({ icon: 'error', title: 'Purchase Failed', text: error.message });
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Confirm Purchase';
        }
    }
}