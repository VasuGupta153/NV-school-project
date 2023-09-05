import {API, ABOUTID} from "../../../backend"

export const getAbout = () => {
    return fetch(`${API}/about/${ABOUTID}`, {
        method: "GET"
    })
    .then(response => {
        return response.json() })
    .catch(err => console.log(err))
}