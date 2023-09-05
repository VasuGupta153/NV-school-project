import {API} from "../../../../backend"

export const createNotice = (userId, token, notice) => {
    return fetch(`${API}/notice/create/${userId}`, {
        method: "POST",
        headers:{
        Accept: "application/json",
        "content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(notice)
  })
  .then(response => {
      return response.json()
  })
  .catch(err => console.log)
} 

export const getallNotices = () => {
    return fetch(`${API}/notices`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
} 

export const getNotice = (noticeId) => {
    return fetch(`${API}/notice/${noticeId}`, {
        method: "GET",
    })
    .then(response => {
        return response.json() })
    .catch(err => console.log(err))
}

export const updateNotice = (noticeId, userId, token, data) => {
    return fetch(`${API}/notice/${noticeId}/${userId}`, {
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

export const deleteNotice = (noticeId, userId, token) => {
    return fetch(`${API}/notice/${noticeId}/${userId}`, {
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