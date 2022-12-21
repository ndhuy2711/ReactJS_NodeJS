import { setCookie, getCookie, removeCookie } from 'typescript-cookie'
import { COOKIES_NAME, COOKIES_EXPIRES } from '../Constant/cookies'

export function setCookies(token: string) {
    setCookie(COOKIES_NAME, token, { expires: COOKIES_EXPIRES })
}

export function getCookies() {
    return getCookie(COOKIES_NAME) || null
}

export function removeCookies() {
    return removeCookie(COOKIES_NAME)
}