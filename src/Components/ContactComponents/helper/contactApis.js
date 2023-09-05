import {API} from "../../../backend"

export const getContact = () => {
    return fetch(`${API}/contact/${process.env.REACT_APP_CONTACT_ID}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
