/**
 * Get Authentication Headers
 */
function getAuthHeaders() {
    const token = localStorage.getItem('car_showroom_token');

    const headers = {
        'Content-Type': 'application/json'
    };

    if (
        token &&
        token !== 'null' &&
        token !== 'undefined' &&
        token.trim() !== ''
    ) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
}

/**
 * Handle Login (UC-02)
 */
async function login(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(credentials)
        });

        const data = await response.json().catch(() => ({}));
        if (response.ok && data.success) {
            const normalizedRole = (data.data.role || '').startsWith('ROLE_') ? data.data.role : `ROLE_${data.data.role || ''}`;
            localStorage.setItem('car_showroom_user', JSON.stringify({ username: data.data.username, role: normalizedRole }));
            localStorage.setItem('car_showroom_token', data.data.token);
            window.location.href = normalizedRole === 'ROLE_ADMIN' ? '/dashboard' : '/cars';
        } else {
            let errorMsg = data.message || 'Login failed';
            if (data.errors) {
                errorMsg += ':\n' + Object.entries(data.errors).map(([field, msg]) => `• ${field}: ${msg}`).join('\n');
            }
            throw new Error(errorMsg);
        }
    } catch (error) {
        showAlert('alert-error', error.message);
    }
}

/**
 * Handle Registration (UC-01)
 */
async function register(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(userData)
        });

        const data = await response.json().catch(() => ({}));
        if (response.ok && data.success) {
            showAlert('alert-success', 'Registration successful! Redirecting to login...');
            setTimeout(() => { window.location.href = '/login'; }, 2000);
        } else {
            let errorMsg = data.message || 'Registration failed';
            if (data.errors) {
                errorMsg += ':\n' + Object.entries(data.errors).map(([field, msg]) => `• ${field}: ${msg}`).join('\n');
            }
            throw new Error(errorMsg);
        }
    } catch (error) {
        showAlert('alert-error', error.message);
    }
}

/**
 * Logout
 */
function logout() {
    localStorage.removeItem('car_showroom_user');
    localStorage.removeItem('car_showroom_token');
    localStorage.removeItem('car_rental_role');
    window.location.href = '/';
}
