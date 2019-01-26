import CategoryController from './category.controller'

export default class CategoryRouter {

    constructor(app) {

        this.app = app
        this.controller = new CategoryController(app)

        this.setupRouter()
    }

    setupRouter() {

        const app = this.app
        const {
            handleSolution,
            handlePlatform,
            handleSolutionById,
        } = this.controller

        /**
         * GET /category/solution
         */
        app.get('/category/solution', handleSolution)


        /**
         * GET /category/solution/:id
         */
        app.get('/category/solution/:id', handleSolutionById)

        /**
         * GET /category/platform
         */
        app.get('/category/platform', handlePlatform)

    }
}