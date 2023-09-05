import {API, ACADEMICID} from "../../../backend"

export const getAcademic = () => {
    return fetch(`${API}/academic/${ACADEMICID}`, {
        method: "GET"
    })
    .then(response => {
        return response.json() })
    .catch(err => console.log(err))
}