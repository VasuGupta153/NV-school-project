import {API} from "../../../../backend"

export const createLetsGetInspired = (userId, token, letsGetInspired) => {
    return fetch(`${API}/letsGetInspired/create/${userId}`, {
        method: "POST",
        headers:{
        Accept: "application/json",
        "content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(letsGetInspired)
  })
  .then(response => {
      return response.json()
  })
  .catch(err => console.log)
} 

export const getallLetsGetInspired = () => {
    return fetch(`${API}/letsGetInspired`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
} 

export const getLetsGetInspired = (letsgetinspiredId) => {
    return fetch(`${API}/letsGetInspired/${letsgetinspiredId}`, {
        method: "GET",
    })
    .then(response => {
        return response.json() })
    .catch(err => console.log(err))
}

export const updateLetsGetInspired = (letsgetinspiredId, userId, token, data) => {
    return fetch(`${API}/letsGetInspired/${letsgetinspiredId}/${userId}`, {
        method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const deleteQuote = (letsGetInspiredId, userId, token) => {
    return fetch(`${API}/letsGetInspired/${letsGetInspiredId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}