import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:3000" });
const API = axios.create({
  baseURL: "https://comfyclothecommerce.onrender.com",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const register = (formData) => API.post("/user/register", formData);
export const login = (formData) => API.post("/user/login", formData);
export const fetchUsers = () => API.get("/user");
export const deleteAccountByUserID = (userId) =>
  API.delete(`/user/delete/${userId}`);

export const fetchProducts = () => API.get("/");
export const updateProductRating = (productId, rating) =>
  API.put(`/${productId}/rating`, { rating });

export const addToWishlist = (userId, productId) =>
  API.post(`/user/${userId}/wishlist/add`, { productId });
export const removeFromWishlist = (userId, productId) =>
  API.delete(`/user/${userId}/wishlist/${productId}`);
export const fetchWishlistItems = (userId) =>
  API.get(`/user/${userId}/wishlist`);

export const addToCart = (userId, product, quantity, size) =>
  API.post(`/user/${userId}/cart/add`, { product, quantity, size });
export const updateCart = (userId, productId, quantity, size) =>
  API.patch(`/user/${userId}/cart/update`, { productId, quantity, size });
export const removeFromCart = (userId, productId) =>
  API.delete(`/user/${userId}/cart/${productId}`);
export const fetchCartItems = (userId) => API.get(`/user/${userId}/cart`);
export const removeAllFromCart = (userId, productId) =>
  API.delete(`/user/${userId}/cart/remove-all`, productId);

export const addContact = (contactData) =>
  API.post(`/contact/add`, contactData);

export const fetchAddresses = (userId) => API.get(`/addresses/${userId}`);
export const addAddress = (userId, addressData) =>
  API.post(`/addresses`, { userId, ...addressData });
export const deleteAddress = (id) => API.delete(`/addresses/${id}`);
export const editAddress = (id, updatedAddress) =>
  API.put(`/addresses/${id}`, updatedAddress);

export const fetchOrders = (userId) => API.get(`${userId}/orders/get`);
export const createOrder = (
  userId,
  userName,
  userPhone,
  userEmail,
  selectedAddress,
  paymentMethod,
  paymentDetails,
  productsInfo
) =>
  API.post(`${userId}/orders/add`, {
    userId,
    userName,
    userPhone,
    userEmail,
    selectedAddress,
    paymentMethod,
    paymentDetails,
    productsInfo,
  });

export const addReview = (productId, formData) =>
  API.post(`/products/${productId}/reviews/add`, formData);
export const fetchReviewsByProductID = (productId) =>
  API.get(`/products/${productId}/reviews`);
export const likeReview = (userId, reviewId) =>
  API.patch(`/products/like/${reviewId}`, userId);
export const dislikeReview = (userId, reviewId) =>
  API.patch(`/products/dislike/${reviewId}`, userId);
