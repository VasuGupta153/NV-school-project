import {API, PRINCIPALID} from "../../../../backend"

export const getPrincipal = () => {
    return fetch(`${API}/principal/${PRINCIPALID}`, {
        method: "GET"
    })
    .then(response => {
        return response.json() })
    .catch(err => console.log(err))
} 

export const updatePrincipal = (principalId, userId, token, data) => {
    return fetch(`${API}/principal/${principalId}/${userId}`, {
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
