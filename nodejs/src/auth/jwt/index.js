require('dotenv').config()
const jwt = require('jsonwebtoken');
const User = require('../../models/User')

const keyRefeshToken = process.env.KEYREFESHTOKEN
const timeRefeshToken = process.env.EXPIRESINREFRESHTOKEN
const keyToken = process.env.KEYTOKEN
const timeToken = process.env.EXPIRESINTOKEN
const JWT = {
    signJWT: (payload, key, expiresIn) => {
        return jwt.sign(
            { data: payload },
            key,
            { expiresIn: expiresIn }
        )
    },
    verifyJWT: (token, key) => {
        try {
            return jwt.verify(token, key)
        } catch (err) {
            return err.name;
        }
    },
    checkRefeshToken: (token) => {
        return JWT.verifyJWT(token, keyRefeshToken)
    },
    createRefeshToken: (payload) => {
        const refeshToken = JWT.signJWT(payload, keyRefeshToken, timeRefeshToken)
        return refeshToken
    },
    createToken: async (payload) => {
        const findEmail = await User.findOne({
            where: { email: payload.email }
        })
        const checkRefeshToken = await JWT.checkRefeshToken(findEmail.dataValues.refesh_token)
        if (checkRefeshToken !== "JsonWebTokenError") {
            if (checkRefeshToken !== "TokenExpiredError") {
                const token = JWT.signJWT(payload, keyToken, timeToken)
                console.log("Token : ", token);
                return token
            } else {
                const refeshToken = JWT.createRefeshToken(payload)
                await User.update({ refesh_token: refeshToken }, {
                    where: { email: payload.email }
                })
                const token = JWT.signJWT(payload, keyToken, timeToken)
                return token
            }
        } else {
            return false
        }
    },
    checkToken: (token) => {
        return JWT.verifyJWT(token, keyToken)
    }
}
module.exports = { JWT }