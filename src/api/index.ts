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

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Ошибка сервера: ${response.status}`);
    }

    return response.json()
}

export const apiPost = async <T = any>(
    endpoint: string,
    data?: any,
    options: RequestInit = {}
): Promise<T> => {
    const token = localStorage.getItem('token') || ''
    const isFormData = data instanceof FormData

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers as Record<string, string>,
    }

    if (isFormData) {
        delete headers['Content-Type']
    }

    const body = isFormData ? data : JSON.stringify(data)

    const response = await fetch(`${url}${endpoint}`, {
        method: 'POST',
        headers,
        body,
        ...options,
    })

    if (response.status === 401) {
        localStorage.removeItem('token')
        if (globalThis.location.pathname !== '/auth') {
            globalThis.location.href = '/auth'
        }
        throw new Error('Не авторизован')
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Ошибка сервера: ${response.status}`)
    }

    return response.json()
}