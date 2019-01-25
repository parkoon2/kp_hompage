// const express = require('express')
import express from 'express'
import http from 'http'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import path from 'path'

import { print } from './utils/logger'
import Database from './database/database'
import AppRouter from './routes'

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



app.server = server

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(morgan('dev'))



const db = new Database(config)
app.db = db

new AppRouter(app)

server.listen(PORT, () => {
    print(`App is running on ${PORT}`)
})


export default app
