import {API, PRINCIPALID} from "../../../../backend"

export const getPrincipal = () => {
    return fetch(`${API}/principal/${PRINCIPALID}`, {
        method: "GET"
    })
    .then(response => {
        return response.json() })
    .catch(err => console.log(err))
}