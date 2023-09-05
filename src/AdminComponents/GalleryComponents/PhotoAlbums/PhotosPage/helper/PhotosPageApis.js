import { API } from "../../../../../backend"

export const createAlbumPhoto = (userId, token, albumphoto) => {
    return fetch(`${API}/albumphoto/create/${userId}`, {
        method: "POST",
        headers:{
        Accept: "application/json",
        "content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(albumphoto)
  })
  .then(response => {
      return response.json()
  })
  .catch(err => console.log)
} 

export const getAllPhotos = () => {
    return fetch(`${API}/albumPhotos`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const deleteAlbumPhoto = (albumphotoId, userId, token) => {
    return fetch(`${API}/albumphoto/${albumphotoId}/${userId}`, {
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

export const createAlbumVideo = (userId, token, albumvideo) => {
    return fetch(`${API}/albumvideo/create/${userId}`, {
        method: "POST",
        headers:{
        Accept: "application/json",
        "content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(albumvideo)
  })
  .then(response => {
      return response.json()
  })
  .catch(err => console.log)
} 

export const getAllVideos = () => {
    return fetch(`${API}/albumvideos`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
} 

export const deleteAlbumVideo = (albumvideoId, userId, token) => {
    return fetch(`${API}/albumvideo/${albumvideoId}/${userId}`, {
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
