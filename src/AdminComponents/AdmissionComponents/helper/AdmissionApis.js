import {API, ADMISSIONID} from "../../../backend"

export const getAdmission = () => {
    return fetch(`${API}/admission/${ADMISSIONID}`, {
        method: "GET"
    })
    .then(response => {
        return response.json() })
    .catch(err => console.log(err))
}

export const updateAdmission = (userId, token, content) => {
    return fetch(`${API}/admission/${ADMISSIONID}/${userId}`, {
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