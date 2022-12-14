import path from "path"

import express from "express"

import rootRoute from "./routes/root.route"
import { errHandler } from "./middleware/errorHandler"

export const app = express()

// built-in middlewre for receiving and parsing json data.
app.use(express.json())

// built-in middleware for serving static files (CSS).
app.use('/', express.static(path.join(__dirname,'..', 'public')))

// Route handlers
app.use('/', rootRoute) // home route

app.all('*', (req, res) => { // send 404
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '..', 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

// error handling middleware
app.use(errHandler)