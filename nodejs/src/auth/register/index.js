const bcrypt = require('bcrypt');
const User = require("../../models/User");
const { JWT } = require('../jwt');


const registerAuth = {
    checkMailUser: async (email) => {
        const checkUser = await User.findOne({
            where: { email: email },
        })
        if (checkUser === null) {
            return false
        }
        return true
    },
    createUser: async (user) => {
        const saltRounds = 10;
        const passHash = await bcrypt.hash(user.password, saltRounds)
        const payload = {
            email: user.email,
            name: user.name,
            phone_number: user.phone_number
        }
        const refesh_token = JWT.createRefeshToken(payload)
        const result = { ...user, password: passHash, refesh_token: refesh_token }
        const newUser = await User.create(result);
        const handleUser = newUser.dataValues
        return { ...handleUser, password: null, refesh_token: null }
    }
}

module.exports = { registerAuth }
