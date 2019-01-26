import UserRouter from './user/user'
import PortfolioRouter from './portfolio/portfolio'
import CategoryRouter from './category/category'

export default class AppRouter {

    constructor(app) {
        this.app = app

        new UserRouter(app)
        new PortfolioRouter(app)
        new CategoryRouter(app)

    }


}