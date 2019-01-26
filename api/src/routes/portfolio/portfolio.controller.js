import Portfolio from '../../models/portfolio'

export default class PortfolioController {

    constructor(app) {
        this.app = app

        this.portfolioModel = new Portfolio(app)
    }

    handleRecentPortfolio = (req, res) => {

        let count = req.params.count
        let error = null

        if (!count) {
            error = { message: 'Param is invalid' }
            return res.status(404).json(error)
        }

        this.portfolioModel.findRecent(count, (err, portfolios) => {

            if (err) {
                error = { message: err }
                return res.status(500).json(error)
            }

            res.status(200).json(portfolios)

        })


        console.log('count', count)
    }

    handlePortfolio = (req, res) => {

        let error = null

        this.portfolioModel.findAll((err, portfolios) => {

            if (err) return res.status(500).json({ message: err })


            // 리턴 값이 배열이 아닐 경우 서버 에러
            if (!Array.isArray(portfolios)) {
                error = { message: 'DB Error' }
                return res.status(500).json(error)
            }

            if (!portfolios.length) {
                error = { message: 'Portfolio is not found' }
                return res.status(404).json(error)
            }

            res.status(200).json(portfolios)

        })
    }

    handlePortfolioById = (req, res) => {
        let id = req.params.id

        let error = null

        this.portfolioModel.findById(id, (err, portfolio) => {

            if (err) return res.status(500).json({ message: err })


            if (!portfolio) {

                error = { message: 'Portfolio is not found' }
                return res.status(404).json(error)
            }

            res.status(200).json(portfolio)
        })
    }

}

