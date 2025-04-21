import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000"

const userAPI = axios.create({
    baseURL: `${BASE_URL}/user`,
})

userAPI.interceptors.request.use((config) => {
    const studentId = localStorage.getItem('studentId')
    // console.log("studentId", studentId)
    if (studentId) {
        config.headers['student_id'] = studentId;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
})

export default userAPI