import { getCookies } from "../../../Api/Cookies/handleCookies"
import { Token } from "../../../Api/Users/Token"

export const getUser = async () => {
    const token = getCookies()
    const result = await Token(token)
    return result
}