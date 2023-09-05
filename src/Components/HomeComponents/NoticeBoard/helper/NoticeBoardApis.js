import {API} from "../../../../backend"

export const getallNotices = () => {
    return fetch(`${API}/notices`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}