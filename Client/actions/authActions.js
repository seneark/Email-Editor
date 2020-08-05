import axios from 'axios';

// Login - Get user token
export const loginUser = (history) => dispatch => {
    axios.get("https://github.com/login/oauth/authorize?client_id=fe52c444dc48746440bc")
        .then(response => {
            // SAve to local storage
            const {access_token} = response.data;
            console.log(access_token);
            localStorage.setItem('token', token);
        })
        .catch(console.log('error'));
};
