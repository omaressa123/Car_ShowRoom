function showToast(message, type = 'info') {
    console.log(`Toast (${type}): ${message}`);
    // Simple implementation
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.backgroundColor = type === 'error' ? '#f44336' : '#4CAF50';
    toast.style.color = 'white';
    toast.style.zIndex = '1000';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
