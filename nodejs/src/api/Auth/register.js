const { registerAuth } = require("../../auth/register")

async function register(req, res) {
    const data = req.body
    const checkUser = await registerAuth.checkMailUser(data.email)
    if (!checkUser) {
        const user = await registerAuth.createUser(data)
        return res.status(200).json({ message: "Register account success ! ", user: user })
    }
    return res.status(400).json({ message: "Account existed !", user: null })
}
module.exports = { register }