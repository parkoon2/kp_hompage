import mysql from 'mysql'

export default class Category {

    constructor(app) {
        this.app = app
    }

    findSolutionById = (id = null, callback = () => { }) => {
        const db = this.app.db

        const query = mysql.format(`
        SELECT NO, CODE, SOLUTION_FIELD_NAME 
        FROM SOLUTION_FIELD 
        WHERE NO = ?`, [id])

        db.query(query)
            .then(rows => callback(null, rows[0]))
            .catch(err => callback(err, null))
    }

    findSolutionAll = (callback = () => { }) => {
        const db = this.app.db

        const query = `
        SELECT NO, CODE, SOLUTION_FIELD_NAME 
        FROM SOLUTION_FIELD`

        db.query(query)
            .then(rows => callback(null, rows))
            .catch(err => callback(err, null))
    }

    findPlatformAll = (callback = () => { }) => {
        const db = this.app.db

        const query = `
        SELECT NO, PLATFORM_NAME 
        FROM PLATFORM`

        db.query(query)
            .then(rows => callback(null, rows))
            .catch(err => callback(err, null))
    }



}