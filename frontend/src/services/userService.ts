import { api } from "../providers"

import { AuthData, Profile, User } from "../schemas/models"
import { LoginDTO, UserDTO } from "../schemas/dto"


const authLogin = (login: LoginDTO) => api.post<AuthData>('/user/authenticate', login)
const getProfile = () => api.get<Profile>(`/user`)
const getAllUsers = () => api.get<User[]>(`/user/all`)
const postUser = (user: UserDTO) => api.post<User>(`/user`, user)
const putUser = (user: Partial<UserDTO>, id: string) => api.put<User>(`/user/${id}`, user)
const deleteUser = (id: string) => api.delete(`/user/${id}`)

export const userService = {
    authLogin,
    getProfile,
    getAllUsers,
    postUser,
    putUser,
    deleteUser
}