import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/courses");
  },
  getAllForUser(userId) {
    return apiClient.get("/courses/userTut/" + userId);
  },
  get(id) {
    return apiClient.get(`/courses/${id}`);
  },
  create(data) {
    return apiClient.post("/courses", data);
  },
  update(id, data) {
    return apiClient.put(`/courses/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/courses/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/courses`);
  },
  findByTitle(title) {
    return apiClient.get(`/courses?title=${title}`);
  },
  
  // New: generic search using ?q=term to match controller
  findByQuery(q) {
    return apiClient.get(`/courses?q=${encodeURIComponent(q)}`);
  }
};
