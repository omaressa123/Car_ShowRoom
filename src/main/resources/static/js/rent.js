/**
 * Car Sale Module (formerly Rent)
 * Features:
 * Buy Car Modal
 * Purchase Summary
 * Customer Form
 * Payment Method
 * Confirm Purchase
 * Success Invoice
 * Mark Car as Sold
 * Refresh Cars List
 */

function openPurchaseModal(carId, carData = {}) {
  const modal = document.getElementById('purchase-modal');
  if (!modal) return;

  modal.style.display = 'flex';
  modal.classList.add('fade-in');
  modal.setAttribute('data-car-id', carId);

  updatePurchaseSummary(carData);
}

function closePurchaseModal() {
  const modal = document.getElementById('purchase-modal');
  if (!modal) return;

  modal.classList.remove('fade-in');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 250);
}

function updatePurchaseSummary(car = {}) {
  const box = document.getElementById('purchase-summary');
  if (!box) return;

  const price = Number(car.price || 0);

  box.innerHTML = `
    <div class="summary-item"><strong>Car:</strong> ${car.brand || '-'} ${car.model || ''} (${car.year || ''})</div>
    <div class="summary-item"><strong>Price:</strong> $${price.toLocaleString()}</div>
    <div class="summary-item"><strong>Status:</strong> Available</div>
  `;
}

async function confirmPurchase() {
  const modal = document.getElementById('purchase-modal');
  const carId = modal?.getAttribute('data-car-id');

  const customerName = document.getElementById('customer-name')?.value.trim();
  const phone = document.getElementById('customer-phone')?.value.trim();
  const email = document.getElementById('customer-email')?.value.trim();
  const paymentMethod = document.getElementById('payment-method')?.value;

  if (!customerName || !phone || !paymentMethod) {
    Swal.fire({ icon: 'error', title: 'Missing Data', text: 'Please fill all required fields' });
    return;
  }

  const payload = {
    carId,
    customerName,
    phone,
    email,
    paymentMethod
  };

  const btn = document.getElementById('confirm-purchase-btn');

  try {
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processing...';
    }

    Swal.fire({
      title: 'Creating Purchase Contract...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    const response = await fetch(`${API_BASE_URL}/purchases`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message || 'Purchase failed');

    Swal.fire({
      icon: 'success',
      title: 'Purchase Completed!',
      html: `
        <p><strong>Invoice #:</strong> ${data.invoiceNo || 'AUTO-GEN'}</p>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Status:</strong> Car Sold</p>
      `
    });

    document.getElementById('purchase-form')?.reset();
    closePurchaseModal();

    if (typeof searchCars === 'function') searchCars({});

  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Purchase Failed', text: error.message });
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = 'Confirm Purchase';
    }
  }
}

