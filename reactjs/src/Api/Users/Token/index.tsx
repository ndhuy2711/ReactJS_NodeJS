import { http } from '../../Utils/http';
export const Token = async (token: any) => {
    const prefix: string = "/token"
    return http.get((`${prefix}`),
        { headers: { Authorization: `Bearer ${token}` } }
    )
        .then((result) => {
            // if(result.data)
            //Kiểm tra api trả về token ntn, nếu :
            //Token sai : thì logout
            //Token hết hạn : set lại cookie bên FE
            // setCookies(token)
            //Token còn hạn thì return réult
            return result
            
        })
        .catch(err => err)
}