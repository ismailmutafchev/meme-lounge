import * as api from './api.js'

const endpoints = {
    userMemes:'/data/memes?where=_ownerId%3D%22',
    memes :'/data/memes?sortBy=_createdOn%20desc',
    create: '/data/memes',
    byId: '/data/memes/',
    deleteById: '/data/memes/',
    update: '/data/memes/'
}

export async function getUserMemes(userId) {
    return api.get(endpoints.userMemes + userId + '%22&sortBy=_createdOn%20desc')
}

export async function getAll() {
    return api.get(endpoints.memes)
}

export async function getById(id) {
    return api.get(endpoints.byId + id)
}

export async function create(data) {
    return api.post(endpoints.create, data)
}

export async function update(id, data) {
    return api.put(endpoints.update + id ,data)
}

export async function deleteById(id) {
    return api.delete(endpoints.deleteById + id)
}