const { JWT } = require("../../auth/jwt")
const { COOKIE_NAME } = require("../Constant/cookie")
const Users = {
    getUser: async (req, res) => {
        const getToken = req.cookies[COOKIE_NAME]
        const verifyToken = await JWT.checkToken(getToken)
        console.log(getToken);
        return res.status(200).json({ user: verifyToken })
    }
}
module.exports = { Users }