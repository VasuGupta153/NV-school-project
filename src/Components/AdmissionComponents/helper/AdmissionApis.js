import {API, ADMISSIONID} from "../../../backend"

export const getAdmission = () => {
    return fetch(`${API}/admission/${ADMISSIONID}`, {
        method: "GET"
    })
    .then(response => {
        return response.json() })
    .catch(err => console.log(err))
}