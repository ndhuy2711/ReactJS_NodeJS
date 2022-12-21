import { http } from '../../Utils/http';
export const Token = async (token: any) => {
    const prefix: string = "/token"
    return http.get((`${prefix}`),
        { headers: { Authorization: `Bearer ${token}` } }
    )
        .then(result => result)
        .catch(err => err)
}