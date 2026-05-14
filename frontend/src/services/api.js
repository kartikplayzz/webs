const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export async function getProducts() {
  const response = await fetch(`${API_BASE}/products`);
  return parseResponse(response);
}

export async function sendInquiry(payload) {
  const response = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return parseResponse(response);
}

export async function adminLogin(password) {
  const response = await fetch(`${API_BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password })
  });
  return parseResponse(response);
}

export async function getInquiries(token) {
  const response = await fetch(`${API_BASE}/admin/inquiries`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return parseResponse(response);
}

export async function createProduct(formData, token) {
  const response = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });
  return parseResponse(response);
}

export async function updateProduct(id, formData, token) {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });
  return parseResponse(response);
}

export async function deleteProduct(id, token) {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return parseResponse(response);
}
