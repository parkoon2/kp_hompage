import jwt from 'jsonwebtoken'

const SECRET = 'kpoint01!'
const EXPIRE_IN = 60 * 60 * 24 * 3

export default class Auth {
    constructor(app) {
        this.app = app
    }

    createToken(user = null, callback = () => { }) {

        let userJSON = JSON.parse(JSON.stringify(user))

        try {

            let token = jwt.sign(userJSON, SECRET, { expiresIn: EXPIRE_IN })

            callback(null, token)

        } catch (err) {
            console.log(err, null)
        }


    }

    checkToken = (token, callback = () => { }) => {

        let error = null

        if (!token) {
            error = { message: 'Token is invalid' }
            return callback(error, null)
        }

        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                error = { message: err }
                return callback(error, null)
            }
            callback(null, decoded)
        })

    }
}