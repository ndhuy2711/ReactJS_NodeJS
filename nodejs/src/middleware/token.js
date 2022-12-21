const { JWT } = require("../auth/jwt");
const User = require("../models/User");

const Token = {
    handleToken: async (token, payload) => {
        const checkToken = await JWT.checkToken(token)
        if (checkToken !== "JsonWebTokenError") {
            if (checkToken !== "TokenExpiredError") {
                return { status: true, token: token }
            } else {
                const getUser = await User.findOne({
                    where: { email: payload.email }
                })
                const getRefreshToken = getUser.dataValues["refesh_token"]
                const checkRefeshToken = JWT.checkRefeshToken(getRefreshToken)
                if (checkRefeshToken !== "JsonWebTokenError") {
                    if (checkRefeshToken !== "TokenExpiredError") {
                        const token = await JWT.createToken(payload)
                        return { status: true, token: token }
                    } else {
                        return { status: false, token: null }
                    }
                } else {
                    return { status: false, token: null }
                }
            }
        } else {
            return { status: false, token: null }
        }
    }
}

module.exports = { Token }