import CategoryModel from '../../models/category'

export default class CategoryController {

    constructor(app) {
        this.app = app

        this.categoryModel = new CategoryModel(app)
    }

    handleSolution = (req, res) => {

        let error = null

        this.categoryModel.findSolutionAll((err, solutions) => {

            if (err) {
                error = { message: err }
                return res.status(500).json(error)
            }

            if (!solutions.length) {
                error = { message: 'Solution is not found' }
                return res.status(404).json(error)

            }

            return res.status(200).json(solutions)

        })
    }

    handleSolutionById = (req, res) => {
        let id = req.params.id

        if (!id) {
            return res.status(404).json({ message: 'Pram is invalid' })
        }

        let error = null

        this.categoryModel.findSolutionById(id, (err, solution) => {

            if (err) {
                error = { message: err }
                return res.status(500).json(error)
            }

            if (!solution) {
                error = { message: 'Solution is not found' }
                return res.status(404).json(error)

            }

            return res.status(200).json(solution)

        })
    }
    handlePlatform = (req, res) => {

        this.categoryModel.findPlatformAll((err, platforms) => {

            if (err) {
                error = { message: err }
                return res.status(500).json(error)
            }

            if (!platforms.length) {
                error = { message: 'platforms is not found' }
                return res.status(404).json(error)
            }

            return res.status(200).json(platforms)

        })

    }
}