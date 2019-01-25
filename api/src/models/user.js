import mysql from 'mysql'
import crypto from 'crypto'
import Auth from './auth'

export default class User {

    constructor(app) {
        this.app = app



        this.login = this.login.bind(this)
    }

    findById(id = null, callback = () => { }) {
        // var sql = "SELECT * FROM ?? WHERE ?? = ?";
        // var inserts = ['users', 'id', userId]
        // sql = mysql.format(sql, inserts)
        const db = this.app.db
        let query = mysql.format('SELECT * FROM USER WHERE USER_ID = ?', [id])
        db.query(query)
            .then(rows => {
                // return only one of id
                callback(null, rows[0])
            })
            .catch(err => {
                callback(err, null)
            })
    }

    login(id = null, password = null, callback = () => { }) {

        let error = null

        if (!id || !password) {
            error = { message: 'Email or password is required' }
            return callback(error, null)
        }

        this.findById(id, (err, user) => {

            if (err || !user) {
                error = { message: `User is not found by ${id}` }
                return callback(error, null)
            }


            if (user) {
                // 패스워드 체크
                const passwordCheck = crypto.createHash('sha512').update(password).digest('hex') === user.USER_PW

                if (!passwordCheck) {
                    error = { message: 'Password is incorrect' }
                    return callback(error, null)
                }

                const auth = new Auth()
                auth.createToken(user, (err, token) => {


                    if (err) {
                        error = { message: 'An error make your token' }
                        return callback(error, null)
                    }

                    delete user.USER_PW

                    user.token = token
                    callback(null, user)



                })
            }

        })

    }
}