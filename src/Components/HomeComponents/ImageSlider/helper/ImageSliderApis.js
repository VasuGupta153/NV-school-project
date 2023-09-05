import {API} from "../../../../backend"

export const getallHeaderPhotos = () => {
    return fetch(`${API}/headerphotos`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}