import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json'
    }
});
api.interceptors.request.use((req) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        req.headers.Authorization = ` Bearer ${token}`
    }
    console.log("req", req);
    return req;
}, (error) => {
    return Promise.reject(error);
})

api.interceptors.response.use((res) => {
    console.log(res)
    return res;
},
    (error) => {
        console.log(error)
        // Handle errors
        if (error.response) {
            const { status, statusText } = error.response;

            switch (status) {
                case 400:
                    console.error('Bad Request');
                    alert('There was a problem with the request.');
                    break;
                case 401:
                    console.error('Unauthorized');
                    // Redirect to login or show an unauthorized message
                    alert('You are not authorized. Redirecting to login.');
                    window.location.href = '/login';
                    break;
                case 403:
                    console.error('Forbidden');
                    alert('You do not have permission to access this resource.');
                    break;
                case 404:
                    console.error(statusText);
                    alert('Api not found');
                    break;
                case 500:
                    console.error('Internal Server Error');
                    alert('An unexpected error occurred. Please try again later.');
                    break;
                default:
                    console.error('An error occurred:', error.response);
                    alert('An error occurred. Please try again.');
            }
        } else {
            // Handle network errors or timeouts
            console.error('Network error or no response from the server');
            alert('Network error. Please check your connection.');
        }

        // Reject the promise to propagate the error to the calling code
        return Promise.reject(error);
    })

export default api;