import {API} from "../../../../backend"

export const createAlbum = (userId, token, album) => {
    return fetch(`${API}/album/create/${userId}`, {
        method: "POST",
        headers:{
        Accept: "application/json",
        "content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(album)
  })
  .then(response => {
      return response.json()
  })
  .catch(err => console.log)
} 

export const getAllAlbums = () => {
    return fetch(`${API}/albums`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getAlbum = (albumId) => {
    return fetch(`${API}/album/${albumId}`, {
        method: "GET",
    })
    .then(response => {
        return response.json() })
    .catch(err => console.log(err))
}

export const updateAlbum = (albumId, userId, token, data) => {
    return fetch(`${API}/album/${albumId}/${userId}`, {
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

export const deleteAlbum = (albumId, userId, token) => {
    return fetch(`${API}/album/${albumId}/${userId}`, {
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
