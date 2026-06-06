import { logout } from '../redux/auth/auth.slice';

export const setupInterceptors = (axiosInstance, store) => {

    //Request Interceptor
    axiosInstance.interceptors.request.use(
        (config) => {
            console.log("Request Interceptor Triggered", config);
            const token = localStorage.getItem("token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    //Response Interceptor
    axiosInstance.interceptors.response.use(
        (response) => {
            console.log("Response Interceptor is Successfull ", response);
            return response;
        },
        (error) => {
            // Optionally handle global errors like 401 here
            console.log("Response Interceptor Error ", error.response?.status);
            if (error.response?.status === 401) {
                console.warn("Token expired or unauthorized. Redirecting...");
                store.dispatch(logout());
            }
            return Promise.reject(error);
        }
    );
}
