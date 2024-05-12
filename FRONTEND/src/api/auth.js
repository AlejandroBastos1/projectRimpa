import instancia from "./axios.js";

export const registerRequest = (user) => instancia.post("/registro", user);

export const loginRequest = (user) => instancia.post("/login", user);

export const verifyTokenRequest = () => instancia.get("/verify");

export const updateUserDataRequest = (userId, newData) => instancia.put(`/updateUser/${userId}`, newData);

export const updateUserPicRequest = (userId, file) => instancia.put(`/updateUserPic/${userId}`, file);

