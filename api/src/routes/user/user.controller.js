import User from '../../models/user'
import Auth from '../../models/auth'

import crypto from 'crypto'

import { getIpFromRequest } from '../../utils/ip'

export default class UserController {
    constructor(app) {
        console.log('UserController', this)
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
    }
    update = (req, res) => {


        let { pw, level, name, email } = req.body
        let { USER_ID, USER_PW, USER_NAME, USER_EMAIL, USER_LEVEL } = req.decoded


        // 패스워드 암호화, pw undefined 인 경우 crypto 에서 에러 발생
        if (pw) {
            pw = crypto.createHash('sha512').update(undefined).digest('hex')
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

}