import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
const __dirname = import.meta.dirname
const app = express();
app.use(morgan("tiny"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})