import UserController from './user.controller'
export default class UserRouter {
    constructor(app) {
        this.app = app
        this.userController = new UserController(app)
        this.setupRouter()
    }

    setupRouter() {
        const app = this.app
        const controller = this.userController;
        // const controller =
        // app.get('/v1/user', (req, res) => {

        // })
        app.get('/user', controller.index)

        /**
         * POST /user/login
         * body
         *  - id (회원 아이디)
         *  - pw (회원 비밀번호)
         */
        app.post('/user/login', controller.login)

    }

}