// Entry file
import express from 'express'
import cors from 'cors'

import 'dotenv/config'
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoute.js'

const app = express()
const port = process.env.PORT || 4000

// MIDDLEWARE
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use() = middleware that runs on every request
// express.urlencoded() = parses form data from request body
// {extended:true} = uses the qs library for parsing (more feature)

connectDB()
// ROUTES
app.use('/api/user',userRouter)

app.get('/',(req,res) => {
    res.send('API WORKING')
})

app.listen(port,() => {
    console.log(`Server started on http://localhost:${port}`)
})