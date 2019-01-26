import User from '../../models/user'
import Auth from '../../models/auth'

import crypto from 'crypto'

import { getIpFromRequest } from '../../utils/ip'

export default class UserController {
    constructor(app) {

        this.app = app
        this.userModel = new User(app)
        this.authModel = new Auth(app)

    }

    login = (req, res) => {
        const { id, pw } = req.body


        this.userModel.login(id, pw, (err, user) => {

            // user 에는 DB에서 받아온 데이터 + token으로 구성 
            if (err) {
                return res.status(404).json(err)
            }

            return res.status(200).json(user)
        })
    }
    regist = (req, res) => {
        const { id, pw, name, email } = req.body

        if (!id || !pw || !name || !email) {
            return res.status(404).json({
                message: 'Invaild properties'
            })
        }
        let user = {
            id,
            pw: crypto.createHash('sha512').update(pw).digest('hex'),
            name,
            email
        }

        this.userModel.regist(user, (err, result) => {
            if (err) {
                return res.status(404).json(err)
            }

            delete user.pw
            user.message = result

            res.status(200).json(user)
        })

        // res.send('개발 진행 중')
    }
    update = (req, res) => {


        let { pw, level, name, email } = req.body
        let { USER_ID, USER_PW, USER_NAME, USER_EMAIL, USER_LEVEL } = req.decoded


        // 패스워드 암호화, pw undefined 인 경우 crypto 에서 에러 발생
        if (pw) {
            pw = crypto.createHash('sha512').update(pw).digest('hex')
        }

        let updatedUser = {
            USER_ID,
            USER_PW: pw || USER_PW,
            USER_NAME: name || USER_NAME,
            USER_EMAIL: email || USER_EMAIL,
            USER_LEVEL: level || USER_LEVEL,
        }

        this.userModel.update(updatedUser, (err, result) => {
            if (err) {
                return res.status(404).json(err)
            }

            delete updatedUser.USER_PW
            updatedUser.message = result

            res.status(200).json(updatedUser)
        })

    }

    history = (req, res) => {

        let token = req.headers['x-access-token'] || null

        if (!token) {
            return res.status(404).json({ message: 'Token is invaild' })
        }

        this.authModel.checkToken(token, (err) => {

            if (err) {
                return res.status(401).json(err)
            }

            const IP = getIpFromRequest(req)

            if (!IP) {
                return res.stats(404).json({ message: 'IP Problem' })
            }

            this.userModel.setUserAcessHistory(IP, (err, result) => {
                if (err) {
                    return res.status(404).json({ message: err })
                }
                res.status(200).json(result)
            })
        })
    }

    verify = (req, res) => {

        let { id, email } = req.query

        // 중복확인은 아이디 또는 이메일 한 개만
        if (Object.keys(req.query).length > 1) {
            return res.status(404).json({ message: 'Just 1 property is available (id or email)' })
        }


        // email 중복확인
        if (email) {
            this.userModel.findByEmail(email, (err, result) => {

                if (err) return res.status(404).json(err)

                // 이미 등록되어 있는 이메일
                if (result) {
                    return res.stats(409).json({
                        message: 'Email is already registed'
                    })
                }

                return res.status(200).json({
                    message: 'This email is available for registration'
                })

            })

        }
        // 아이디 중복확인
        else if (id) {

            this.userModel.findById(id, (err, result) => {

                if (err) return res.status(404).json(err)

                // 이미 등록되어 있는 아이디
                if (result) {
                    return res.stats(409).json({
                        message: 'ID is already registed'
                    })
                }

                return res.status(200).json({
                    message: 'This id is available for registration'
                })
            })
        }
        // 그 이외에 파라미터
        else {

            return res.status(404).json({
                message: 'Query is invaild'
            })
        }
    }

}