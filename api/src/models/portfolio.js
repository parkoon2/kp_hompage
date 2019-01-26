import mysql from 'mysql'

export default class Portfolio {
    constructor(app) {

        this.app = app
    }

    findRecent(count, callback = () => { }) {

        const db = this.app.db

        // TODO: limit 뒤에 count가 문자로 들어가 에러난다. 어떻게 해결? 일단 3으로 고정
        const query = mysql.format(`
        SELECT P.NO, P.PROJECT_NAME, P.CONTENTS, date_format(P.START_DATE, '%Y-%M-%D') AS START_DATE, date_format(P.END_DATE, '%Y-%M-%D') AS END_DATE, PI.ORIGINAL_IMG_NAME, PI.SUB_IMG_NAME 
        FROM PORTFOLIO AS P, PORTFOLIO_IMG AS PI 
        WHERE P.NO = PI.PORTFOLIO_NO AND FRONT_IMG = 0 ORDER BY STATE ASC, P.END_DATE DESC LIMIT 3`, [count])

        db.query(query)
            .then(rows => callback(null, rows))
            .catch(err => callback(err, null))
    }


    findAll = (callback = () => { }) => {
        const db = this.app.db
        const query = `SELECT A.NO AS NO, A.PROJECT_NAME AS PROJECT_NAME, A.CONTENTS AS CONTENTS, DATE_FORMAT(A.START_DATE, '%Y-%m-%d') AS START_DATE, DATE_FORMAT(A.END_DATE, '%Y-%m-%d') AS END_DATE, B.ORIGINAL_IMG_NAME AS ORIGINAL_IMG_NAME, B.SUB_IMG_NAME AS SUB_IMG_NAME
        FROM PORTFOLIO AS A, PORTFOLIO_IMG AS B
        WHERE A.NO = B.PORTFOLIO_NO AND FRONT_IMG = 0 ORDER BY STATE ASC, A.END_DATE DESC`

        db.query(query)
            .then(rows => callback(null, rows))
            .catch(err => callback(err, null))
    }

    findById = (id = null, callback = () => { }) => {

        const db = this.app.db
        const query = mysql.format(`SELECT A.NO AS NO, A.PROJECT_NAME AS PROJECT_NAME, A.CONTENTS AS CONTENTS, DATE_FORMAT(A.START_DATE, '%Y-%m-%d') AS START_DATE, DATE_FORMAT(A.END_DATE, '%Y-%m-%d') AS END_DATE, B.ORIGINAL_IMG_NAME AS ORIGINAL_IMG_NAME, B.SUB_IMG_NAME AS SUB_IMG_NAME
        FROM PORTFOLIO AS A, PORTFOLIO_IMG AS B
        WHERE A.NO = B.PORTFOLIO_NO AND A.NO = ? AND FRONT_IMG = 0 
        ORDER BY STATE ASC, A.END_DATE DESC`, [id])

        db.query(query)
            .then(rows => callback(null, rows[0]))
            .catch(err => callback(err, null))
    }

    findByOption = (option = {}, callback = () => { }) => {

    }

}