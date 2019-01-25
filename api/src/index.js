// const express = require('express')
import express from 'express'
import http from 'http'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import path from 'path'

import { print } from './utils/logger'
import Database from './database/database'
import AppRouter from './routes'

import AuthModel from './models/auth'
import Auth from './models/auth';

const PORT = process.env.PORT || 7777
const app = express()
const server = http.createServer(app)

const config = {
    connectionLimit: 10,
    host: '106.240.247.42',
    user: 'kpoint',
    password: 'kpoint01',
    database: 'kp_homepage',
}

const openAPI = ['/user/login']



app.server = server

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(morgan('dev'))

app.use((req, res, next) => {

    let url = req.url
    console.log(req.url)
    openAPI.forEach(api => {
        if (url === api) return next()
    })

    const token = req.body.token || req.query.token || req.headers['x-access-token']

    new Auth(app).checkToken(token, (err, decoded) => {
        if (err) {
            return res.status(401).json(err)
        }

        // req 객체서 decoded 사용할 수 있게 저장
        req.decoded = decoded
        console.log('decoded', decoded)
        next()
    })
})



const db = new Database(config)
app.db = db

new AppRouter(app)

server.listen(PORT, () => {
    print(`App is running on ${PORT}`)
})


export default app
