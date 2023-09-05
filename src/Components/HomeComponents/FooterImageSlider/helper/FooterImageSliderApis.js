import {API} from "../../../../backend"

export const getallFooterPhotos = () => {
    return fetch(`${API}/footerphotos`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
} 