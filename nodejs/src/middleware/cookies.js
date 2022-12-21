const { JWT } = require("../auth/jwt")
const { Token } = require("./token")

const cookiesMiddle = {

    getCookies: (req, res) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1]
            if (token !== "null") {
                return { status: true, token: token }
            }
            return { status: false, token: null }
        }
        else {
            return { status: false, token: null }
        }
    },
    createCookies: (req, res, next) => {
        const checkCookies = cookiesMiddle.getCookies(req, res)
        console.log("checkCookies :", checkCookies);
        if (!checkCookies.status) {
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