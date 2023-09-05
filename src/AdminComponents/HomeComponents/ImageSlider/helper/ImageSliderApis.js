import {API} from "../../../../backend"

export const createHeaderPhoto = (userId, token, headerphotoURL) => {
    return fetch(`${API}/headerphoto/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(headerphotoURL)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getallHeaderPhotos = () => {
    return fetch(`${API}/headerphotos`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const deleteHeaderPhoto = (headerphotoId, userId, token) => {
    return fetch(`${API}/headerphoto/${headerphotoId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}