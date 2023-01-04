import { getCookies } from '../Cookies/handleCookies';
import { http } from '../Utils/http';


export const register = async (values: any) => {
    const prefix: string = "/register"
    return http.post((`${prefix}`), values)
        .then(result => result)
        .catch(err => err)

}

export const login = async (values: any) => {
    const prefix: string = "/login"
    const token = getCookies() || null
    return http.post(
        (`${prefix}`),
        values,
        { headers: { Authorization: `Bearer ${token}` } }
    )
        .then(result => result)
        .catch(err => err)

}