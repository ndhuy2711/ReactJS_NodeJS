const { JWT } = require("../../auth/jwt");
const { checkCookies } = require("../../middleware/cookies");
const User = require("../../models/User");
const bcrypt = require('bcrypt');
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
    },

    updateUser: (req, res) => {
        const user = req.body
        console.log("user", user);
        const _updateUser = async () => await User.update({
            name: user.name,
            phone_number: user.phone_number,
            gender: user.gender
        }, {
            where: {
                email: user.email
            }
        }
        )
        _updateUser()
            .then(() => {
                return res.status(200).json({ msg: "Update User Success !", user: user, status : true })
            })
            .catch(() => res.status(401).json({ msg: "Update User Failed !", user: "", status : false }))

    },

    changePassword: (req, res) => {
        const data = req.body
        console.log("data : ", data);
        if (data.new_password === data.confirm) {
            const _getPassword = async () => await User.findOne({
                where: {
                    email: data.email
                }
            }
            )

            const _updatePassword = async () => {
                const saltRounds = 10;
                const passHash = await bcrypt.hash(data.new_password, saltRounds)
                return await User.update({
                    password: passHash
                }, {
                    where: {
                        email: data.email
                    }
                }
                )
            }
            _getPassword()
                .then((result) => {
                    const password = result.dataValues.password
                    const _checkPassword = async () => await bcrypt.compare(data.old_password, password)
                    _checkPassword()
                        .then((result) => {
                            if (result) {
                                _updatePassword()
                                    .then(() => {
                                        return res.status(200).json({ msg: "Change Password Success !", status: true })
                                    })
                            }
                            else {
                                res.status(401).json({ msg: "Change Password Failed !", status: false })
                            }
                        })
                })
                .catch((err) => err)
        }
        else {
            res.status(401).json({ msg: "Change Password Failed !", status : false })
        }

    }
}
module.exports = { Users }