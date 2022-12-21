import { http } from '../Utils/http';


export const getUser = async () => {
    const prefix: string = "/user"
    return http.get((`${prefix}`))
        .then(result => result)
        .catch(err => err)

}