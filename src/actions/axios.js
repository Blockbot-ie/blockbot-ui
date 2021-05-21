import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "https://myblockbot-api.herokuapp.com"
  baseURL: "http://localhost:8000"
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
      
      if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
          const refresh_token = localStorage.getItem('refresh');
          console.log(refresh_token)
          return axiosInstance
              .post('/api/dj-rest-auth/token/refresh/', {refresh: refresh_token})
              .then((response) => {
                  localStorage.setItem('access', response.data.access);
                  localStorage.setItem('refresh', response.data.refresh);

                  axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                  originalRequest.headers['Authorization'] = "Bearer " + response.data.access;

                  return axiosInstance(originalRequest);
              })
              .catch(err => {
                  console.log(err)
              });
      }
      return Promise.reject(error);
  }
);

export default axiosInstance