const bcrypt = require('bcrypt');
const User = require("../../models/User");
const { JWT } = require('../jwt');

const loginAuth = {
    checkMail: async (account) => {
        const checkMail = await User.findOne({
            where: { email: account.email },
        })
        const countMail = await User.count({
            where: { email: account.email },
        })
        if (countMail === 1) {
            const password = account.password
            const checkPassword = await bcrypt.compare(password, checkMail.dataValues.password)
            if (checkPassword) {
                const payload = {
                    email: checkMail.dataValues.email,
                    name: checkMail.dataValues.name,
                    phone_number: checkMail.dataValues.phone_number
                }
                const token = await JWT.createToken(payload)
                return { status: true, payload: payload, token: token }
            } else {
                return { status: false, payload: null, token: null }
            }
        }
        else {
            return { status: false, payload: null, token: null }
        }
    }
}

module.exports = { loginAuth }