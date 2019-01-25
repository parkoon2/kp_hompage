import User from '../../models/user'

export default class UserController {
    constructor(app) {
        console.log('UserController', this)
        this.app = app
        this.userModel = new User(this.app)

        this.index = this.index.bind(this)
        this.login = this.login.bind(this)
    }

    login(req, res) {
        const { id, pw } = req.body


        this.userModel.login(id, pw, (err, user) => {

            // user 에는 DB에서 받아온 데이터 + token으로 구성 
            if (err) {
                return res.status(404).json(err)
            }

            return res.status(200).json(user)
        })
    }

    index(req, res) {

        this.userModel.findById('kpoint')

    }
}