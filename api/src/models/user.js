import mysql from 'mysql'
import crypto from 'crypto'
import Auth from './auth'

export default class User {

    constructor(app) {
        this.app = app



        this.login = this.login.bind(this)
    }

    update = (newUser = null, callback = () => { }) => {

        let { USER_PW, USER_NAME, USER_EMAIL, USER_ID } = newUser

        let query = mysql.format(`
        UPDATE USER SET USER_PW = ? 
        ,USER_NAME = ? 
        ,USER_EMAIL = ? 
        WHERE USER_ID = ?`, [USER_PW, USER_NAME, USER_EMAIL, USER_ID])

        this.app.db.query(query)
            .then(rows => callback(null, rows))
            .catch(err => callback(err, null))
    }

    findByEmail(email = null, callback = () => { }) {

        const db = this.app.db
        let query = mysql.format(`SELECT * FROM USER WHERE USER_EMAIL = ?`, [email])

        db.query(query)
            .then(rows => callback(null, rows[0]))
            .catch(err => callback(err, null))
    }

    findById(id = null, callback = () => { }) {

        const db = this.app.db

        // TODO: SELECT를 전부 해오는 건 문제가 있을까? 유저 확인은 그냥 특정 값만 있으면 되는데..
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

    regist(user = {}, callback = () => { }) {

        let error = null

        if (!user) {
            error = { message: 'User is not defined' }
            return callback(error, null)
        }

        let { id, pw, name, email } = user

        // 이미 등록되어 있는 회원인지 확인
        this.findById(id, (err, user) => {
            if (err) {
                error = { message: err }
                return callback(error, null)
            }

            if (user) {
                error = { message: 'User is already registed' }
                return callback(error, null)
            }

            let query = mysql.format(`INSERT INTO USER (USER_ID, USER_PW, USER_NAME, USER_EMAIL) VALUES (?, ?, ?, ?) `, [id, pw, name, email])
            // INSERT INTO `student` VALUES ('2', 'leezche', '여자', '서울', '2000-10-26');
            this.app.db.query(query)
                .then(rows => callback(null, rows))
                .then(err => callback(err, null))

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
    setUserAcessHistory = (ip = null, callback = () => { }) => {

        const db = this.app.db

        let error = null

        this.findIpFromDate(ip, (err, ips) => {


            if (err) {
                error = { message: err }
                return callback(error, null)
            }

            if (ips.length) {
                error = { message: `${ip} is already registed on ${new Date()}` }
                return callback(error, null)
            }

            let query = mysql.format(`INSERT INTO ACCESS_STATISTICS SET IP = ?`, [ip])
            db.query(query)
                .then(rows => {
                    callback(null, rows)
                })
                .catch(err => callback({ message: err }, null))


            // 데이터베이스 IP 저장
        })

        // 일자를 비교해 IP가 이미 등록 되어 있다면, 더 이상 등록하지 않는다
        // let query = mysql.format(`SELECT NO FROM ACCESS_STATISTICS WHERE IP='?' 
        // AND DATE_FORMAT(DATE, '%d') = DATE_FORMAT(CURDATE(), '%d')`, [ip])

        // db.query(query)
        //     .then(rows => {
        //         // return only one of id
        //         callback(null, rows[0])
        //     })
        //     .catch(err => {
        //         callback(err, null)
        //     })

    }

    /**
     * TODO: '일'만 사용해서 비교하고 있다. 월도 비교해야함.
     */
    findIpFromDate = (ip = null, callback = () => { }) => {

        const db = this.app.db
        let query = mysql.format(`SELECT * FROM ACCESS_STATISTICS WHERE IP=? 
        AND DATE_FORMAT(DATE, '%d') = DATE_FORMAT(CURDATE(), '%d')`, [ip])

        db.query(query)
            .then(rows => callback(null, rows))
            .catch(err => callback(err, null))
    }
}