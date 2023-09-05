import {API} from "../../../../backend"

export const createFooterPhoto = (userId, token, footerphotoURL) => {
    return fetch(`${API}/footerphoto/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(footerphotoURL)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getallFooterPhotos = () => {
    return fetch(`${API}/footerphotos`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}  

export const deleteFooterPhoto = (footerphotoId, userId, token) => {
    return fetch(`${API}/footerphoto/${footerphotoId}/${userId}`, {
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