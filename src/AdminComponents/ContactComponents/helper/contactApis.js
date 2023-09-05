import {API} from "../../../backend"

export const getContact = () => {
    return fetch(`${API}/contact/${process.env.REACT_APP_CONTACT_ID}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const updateContact = (userId, token, data) => {
    return fetch(`${API}/contact/${process.env.REACT_APP_CONTACT_ID}/${userId}`, {
        method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
} 
 