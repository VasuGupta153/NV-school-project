import {API} from "../../../backend"

export const createStaff = (userId, token, staff) => {
    return fetch(`${API}/staff/create/${userId}`, {
        method: "POST",
        headers:{
        Accept: "application/json",
        "content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(staff)
  })
  .then(response => {
      return response.json()
  })
  .catch(err => console.log)
} 

export const getAllStaff = () => {
    return fetch(`${API}/staffs`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
export const getStaff = (staffId) => {
    return fetch(`${API}/staff/${staffId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const updateStaff = (staffId, userId, token, data) => {
    return fetch(`${API}/staff/${staffId}/${userId}`, {
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

export const deleteStaff = (staffId, userId, token) => {
    return fetch(`${API}/staff/${staffId}/${userId}`, {
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
