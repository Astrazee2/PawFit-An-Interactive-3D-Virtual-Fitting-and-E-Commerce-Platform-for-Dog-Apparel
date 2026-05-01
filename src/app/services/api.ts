const BASE_URL = 'http://localhost:5000/api'

// Helper function to get token
const getToken = () => localStorage.getItem('token')

// Helper function for headers
const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
})

// ==================== AUTH ====================
export const authAPI = {
  register: async (name: string, email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    return res.json()
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    return res.json()
  }
}

// ==================== PETS ====================
export const petsAPI = {
  getPets: async () => {
    const res = await fetch(`${BASE_URL}/pets`, {
      headers: authHeaders()
    })
    return res.json()
  },

  createPet: async (petData: any) => {
    const res = await fetch(`${BASE_URL}/pets`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(petData)
    })
    return res.json()
  },

  updatePet: async (id: string, petData: any) => {
    const res = await fetch(`${BASE_URL}/pets/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(petData)
    })
    return res.json()
  },

  deletePet: async (id: string) => {
    const res = await fetch(`${BASE_URL}/pets/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    return res.json()
  }
}

// ==================== PRODUCTS ====================
export const productsAPI = {
  getProducts: async (filters?: any) => {
    const params = new URLSearchParams(filters).toString()
    const res = await fetch(`${BASE_URL}/products?${params}`)
    return res.json()
  },

  getProductById: async (id: string) => {
    const res = await fetch(`${BASE_URL}/products/${id}`)
    return res.json()
  }
}

// ==================== CART ====================
export const cartAPI = {
  getCart: async () => {
    const res = await fetch(`${BASE_URL}/cart`, {
      headers: authHeaders()
    })
    return res.json()
  },

  addToCart: async (productId: string, size: string, quantity: number, price: number) => {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ productId, size, quantity, price })
    })
    return res.json()
  },

  removeFromCart: async (itemId: string) => {
    const res = await fetch(`${BASE_URL}/cart/${itemId}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    return res.json()
  },

  clearCart: async () => {
    const res = await fetch(`${BASE_URL}/cart/clear`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    return res.json()
  }
}

// ==================== ORDERS ====================
export const ordersAPI = {
  createOrder: async (orderData: any) => {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(orderData)
    })
    return res.json()
  },

  getOrders: async () => {
    const res = await fetch(`${BASE_URL}/orders`, {
      headers: authHeaders()
    })
    return res.json()
  },

  getOrderById: async (id: string) => {
    const res = await fetch(`${BASE_URL}/orders/${id}`, {
      headers: authHeaders()
    })
    return res.json()
  }
}