import { API } from "../../../../../backend"

export const getAllPhotos = () => {
    return fetch(`${API}/albumPhotos`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getAllVideos = () => {
    return fetch(`${API}/albumvideos`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}