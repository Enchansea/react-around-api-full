export const BASE_URL = "https://ness.students.nomoreparties.site";

export const register = ( email, password ) => {
  console.log('signup');
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
    .then((res) => { return res })
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
    .then((data) => {
        if (data.token){
            localStorage.setItem('jwt', data.token);
            return data;
        } else {
            return;
        }
    })
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
    .then((res) => {return res});
}
