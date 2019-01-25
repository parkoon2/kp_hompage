import UserRouter from './user/user'
export default class AppRouter {
    constructor(app) {
        this.app = app
        console.log(`App router`)

        new UserRouter(app)
    }
}