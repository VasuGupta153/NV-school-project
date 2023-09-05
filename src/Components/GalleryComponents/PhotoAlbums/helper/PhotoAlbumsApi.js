import {API} from "../../../../backend"

export const getAllAlbums = () => {
    return fetch(`${API}/albums`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
// export const getStaff = (staffId) => {
//     return fetch(`${API}/staff/${staffId}`, {
//         method: "GET"
//     })
//     .then(response => {
//         return response.json()
//     })
//     .catch(err => console.log(err))
// }

