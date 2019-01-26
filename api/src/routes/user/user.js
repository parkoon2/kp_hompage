import UserController from './user.controller'
export default class UserRouterRouter {
    constructor(app) {
        this.app = app
        this.userController = new UserController(app)
        this.setupRouter()
    }

    setupRouter() {

        const app = this.app
        const controller = this.userController
        const {
            verify
        } = this.userController


        /**
         * POST /user/login
         * body
         *  - id (회원 아이디)
         *  - pw (회원 비밀번호)
         */
        app.post('/user/login', controller.login)

        /**
         * GET /user/history
         * header
         *  - x-access-token
         */
        app.put('/user/history', controller.history)


        /**
         * PUT /user
         * body 
         *  - id  (회원아이디 - Y), 
         *  - pw (변경할 비밀번호 - N)
         *  - level (변경할 등급 - N)
         *  - name (변경할 이름 - N)
         *  - email (변경할 메일주소 - N)
         * 
         *   TODO: 회원번호만 있으면 해킹 가능. 토큰을 체크 한다면 문제 없을까?
         */

        /**
         * POST /user
         * id (회원id - Y)
         * pw (회원비밀번호 - Y)
         * name (회원이름 - Y)
         * email (회원이메일 - Y)
         * 
         * TODO: Validation 추가해야 함
         * TODO: 회원가입에는 토큰이 따로 필요가 없어야 할 텐데... 아닌가? 페이지에 접근했을 때 줘야하나..?
         */
        app.post('/user/regist', controller.regist)

        /**
         * GET /user/identities
         */
        app.get('/user/identities', verify)

        /**
         * GET /user/identities
         */
        app.get('/user/identities', verify)

    }

}