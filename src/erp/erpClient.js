const API_BASE_URL = 'http://localhost:4000/api/v1';

// Products
export async function fetchErpProducts(params = {}) {
  try {
    const cleanParams = {};
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '' && value !== 'ALL' && value !== 'undefined') {
        cleanParams[key] = value;
      }
    }
    const query = new URLSearchParams(cleanParams).toString();
    const res = await fetch(`${API_BASE_URL}/products?${query}`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching ERP products:', err);
    return { success: false, error: err.message, data: [], pagination: {} };
  }
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    return { success: false, error: err.message };
  }
}

export async function createProductMatrix(data) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/matrix`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    console.error('Error creating product matrix:', err);
    return { success: false, error: err.message };
  }
}

export async function toggleProductWeb(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}/toggle-web`, {
      method: 'PATCH'
    });
    return await res.json();
  } catch (err) {
    console.error('Error toggling product web:', err);
    return { success: false, error: err.message };
  }
}

// Shipments / Imports
export async function fetchErpShipments() {
  try {
    const res = await fetch(`${API_BASE_URL}/shipments`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching shipments:', err);
    return { success: false, error: err.message, data: [] };
  }
}

export async function receiveShipment(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/shipments/${id}/receive`, {
      method: 'POST'
    });
    return await res.json();
  } catch (err) {
    console.error('Error receiving shipment:', err);
    return { success: false, error: err.message };
  }
}

// Stock & Multi-warehouse
export async function fetchStockSummary() {
  try {
    const res = await fetch(`${API_BASE_URL}/stock/summary`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching stock summary:', err);
    return { success: false, error: err.message, data: [] };
  }
}

export async function transferStock(data) {
  try {
    const res = await fetch(`${API_BASE_URL}/stock/transfer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    console.error('Error transferring stock:', err);
    return { success: false, error: err.message };
  }
}

// Orders / Kanban
export async function fetchErpOrders(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/orders?${query}`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching orders:', err);
    return { success: false, error: err.message, data: [] };
  }
}

export async function updateOrderStatus(id, status) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return await res.json();
  } catch (err) {
    console.error('Error updating order status:', err);
    return { success: false, error: err.message };
  }
}

export async function getOrderWhatsAppPayload(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${id}/whatsapp-payload`);
    return await res.json();
  } catch (err) {
    console.error('Error getting WhatsApp payload:', err);
    return { success: false, error: err.message };
  }
}

// Customers & Cuentas Corrientes
export async function fetchErpCustomers(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/customers?${query}`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching customers:', err);
    return { success: false, error: err.message, data: [] };
  }
}

export async function fetchCustomerDetail(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/customers/${id}`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching customer detail:', err);
    return { success: false, error: err.message };
  }
}

export async function createCustomer(data) {
  try {
    const res = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    console.error('Error creating customer:', err);
    return { success: false, error: err.message };
  }
}

// Production & Talleres
export async function fetchProductionSummary() {
  try {
    const res = await fetch(`${API_BASE_URL}/production`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching production:', err);
    return { success: false, error: err.message, data: {} };
  }
}

export async function createProductionOrder(data) {
  try {
    const res = await fetch(`${API_BASE_URL}/production/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    console.error('Error creating production order:', err);
    return { success: false, error: err.message };
  }
}

export async function advanceProductionOrder(id, data) {
  try {
    const res = await fetch(`${API_BASE_URL}/production/orders/${id}/advance`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    console.error('Error advancing production order:', err);
    return { success: false, error: err.message };
  }
}

// POS Showroom & Barcode Scan
export async function scanBarcodePos(barcode) {
  try {
    const res = await fetch(`${API_BASE_URL}/pos/scan/${encodeURIComponent(barcode)}`);
    return await res.json();
  } catch (err) {
    console.error('Error scanning barcode:', err);
    return { success: false, error: err.message };
  }
}

// Transports
export async function fetchErpTransports() {
  try {
    const res = await fetch(`${API_BASE_URL}/transports`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching transports:', err);
    return { success: false, error: err.message, data: [] };
  }
}

// Metadata
export async function fetchErpMeta() {
  try {
    const res = await fetch(`${API_BASE_URL}/meta`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching meta:', err);
    return { success: false, error: err.message, data: {} };
  }
}
