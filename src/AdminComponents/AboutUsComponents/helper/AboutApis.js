import {API, ABOUTID} from "../../../backend"

export const getAbout = () => {
    return fetch(`${API}/about/${ABOUTID}`, {
        method: "GET"
    })
    .then(response => {
        return response.json() })
    .catch(err => console.log(err))
}

export const updateAbout = (userId, token, content) => {
    return fetch(`${API}/about/${ABOUTID}/${userId}`, {
        method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(content)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}