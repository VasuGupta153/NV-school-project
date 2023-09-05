import {API, ACADEMICID} from "../../../backend"

export const getAcademic = () => {
    return fetch(`${API}/academic/${ACADEMICID}`, {
        method: "GET"
    })
    .then(response => {
        return response.json() })
    .catch(err => console.log(err))
}

export const updateAcademic = (userId, token, content) => {
    return fetch(`${API}/academic/${ACADEMICID}/${userId}`, {
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