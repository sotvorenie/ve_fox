const url = 'http://localhost:5557'

export const allApiNames = {
    history: 'history',
    like: 'like',
    watch_later: 'watch_later',
}

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token') || ''

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    }

    const response = await fetch(`${url}${endpoint}`, {
        ...options,
        headers
    })

    if (response.status === 401) {
        localStorage.removeItem('token')
        const location = globalThis.location.pathname
        if (location !== '/auth') {
            globalThis.location.href = '/auth'
        }
    }

    return response.json()
}