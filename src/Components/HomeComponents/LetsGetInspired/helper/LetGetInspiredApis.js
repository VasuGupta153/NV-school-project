import {API} from "../../../../backend"

export const getallLetsGetInspired = () => {
    return fetch(`${API}/letsGetInspired`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}