import PortfolioController from './portfolio.controller'

export default class PortfolioRouter {
    constructor(app) {
        this.app = app

        this.portfolioController = new PortfolioController(app)

        this.setupRouter()
    }

    setupRouter() {
        const app = this.app
        const {
            handlePortfolio,
            handlePortfolioById,
            handleRecentPortfolio,
        } = this.portfolioController

        /**
         * GET /portfolio
         */
        app.get('/portfolio', handlePortfolio)

        /**
         * GET /portfolio/id/1
         */
        app.get('/portfolio/id/:id', handlePortfolioById)

        /**
         * GET /portfolio/recent/3
         */
        app.get('/portfolio/recent/:count', handleRecentPortfolio)

    }
}