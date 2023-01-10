require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors({
    // origin: process.env.DOMAIN + ":" + process.env.PORT, //Chan tat ca cac domain khac ngoai domain nay
    credentials: true //Để bật cookie HTTP qua CORS
}))
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const { register } = require('./src/api/Auth/register')
const { login } = require('./src/api/Auth/login')
const cookiesMiddle = require('./src/middleware/cookies')
const { Users } = require('./src/api/Users')

const domain = process.env.DOMAIN
const port = process.env.PORT

app.post('/register', register)
app.post('/login', cookiesMiddle.createCookies, login)
app.get('/token', cookiesMiddle.getCookies, Users.getUser) // Kiểm tra Token để get data gửi về browser
app.post('/updateUser', cookiesMiddle.getCookies, Users.updateUser) //Update User Info
app.post('/changePassword', cookiesMiddle.getCookies, Users.changePassword) //Update User Info
app.listen(port, () => {
    console.log(`Server start at : ${domain}:${port}`);
})

