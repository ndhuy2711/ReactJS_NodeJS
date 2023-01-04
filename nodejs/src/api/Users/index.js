const { JWT } = require("../../auth/jwt");
const User = require("../../models/User");
// const { COOKIE_NAME } = require("../Constant/cookie")
const Users = {
    getUser: async (req, res) => {
        const token = req.headers.authorization.split(' ')[1]
        const verifyToken = await JWT.checkToken(token)
        const users = await User.findOne({
            where: { email: verifyToken.data.email }
        })
        const _users = users.dataValues
        const result = { ..._users, password: "", refesh_token: "" }
        return res.status(200).json({ users: result })
    }
}
module.exports = { Users }