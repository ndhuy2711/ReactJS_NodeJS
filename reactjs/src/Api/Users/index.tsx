import { getCookies } from '../Cookies/handleCookies';
import { http } from '../Utils/http';


export const getUser = async () => {
    const prefix: string = "/user"
    return http.get((`${prefix}`))
        .then(result => result)
        .catch(err => err)

}

export const updateUser = async (values: any) => {
    const prefix: string = "/updateUser"
    const token: string = getCookies() || ""
    return http.post((`${prefix}`), values, { headers: { Authorization: `Bearer ${token}` } })
        .then(result => result)
        .catch(err => err)
}

export const changePassword = async (values: any) => {
    const prefix: string = "/changePassword"
    const token: string = getCookies() || ""
    return http.post((`${prefix}`), values, { headers: { Authorization: `Bearer ${token}` } })
        .then(result => result)
        .catch(err => err)
}