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
}