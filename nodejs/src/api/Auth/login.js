const { loginAuth } = require("../../auth/login");

async function login(req, res) {
    const data = req.body
    const checkUser = await loginAuth.checkMail(data)
    if (checkUser.status) {
        return res.status(200).json({ message: "Login success ! ", statusLogin: checkUser.status, user: checkUser.payload, token: checkUser.token })
    }
    return res.status(400).json({ message: "Login failed ! ", statusLogin: checkUser.status, user: checkUser.payload, token: checkUser.token })
}
module.exports = { login }