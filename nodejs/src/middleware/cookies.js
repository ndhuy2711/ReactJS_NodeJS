const { JWT } = require("../auth/jwt")
const { Token } = require("./token")

const cookiesMiddle = {

    checkCookies: (request) => {
        if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = request.headers.authorization.split(' ')[1]
            if (token !== "null") {
                return { token: token }
            }
            else {
                return { token: null }
            }
        }
    },

    getCookies: (req, res, next) => {
        const checkCookies = cookiesMiddle.checkCookies(req)
        if (checkCookies.token !== "null") {
            const verifyToken = async () => {
                const checkToken = await JWT.checkToken(checkCookies.token)
                if (checkToken !== "JsonWebTokenError") {
                    if (checkToken !== "TokenExpiredError") {
                        next()
                    } else {
                        const refeshToken = JWT.createRefeshToken(payload)
                        await User.update({ refesh_token: refeshToken }, {
                            where: { email: payload.email }
                        })
                        const token = JWT.signJWT(payload, keyToken, timeToken)
                        return res.status(200).json({ msg: "Token expires !", token: token })
                    }
                } else {
                    return res.status(401).json({ msg: "Token failed", token: null })
                }
            }
            verifyToken()
        } else {
            return res.status(401).json({ msg: "Token null", token: null })
        }
    },

    createCookies: (req, res, next) => {
        const checkCookies = cookiesMiddle.checkCookies(req)
        console.log("checkCookies :", checkCookies);
        if (checkCookies.token === null) {
            next()
        } else {
            const _token = checkCookies.token
            const payload = req.body
            Token.handleToken(_token, payload)
                .then((result) => {
                    if (result.status) {
                        next()
                    } else {
                        return res.status(200).json({ message: "Token Expries! Please re-login ! ", statusLogin: false, user: null, token: null })
                    }
                })
        }
    }
}

module.exports = cookiesMiddle