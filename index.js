import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import 'dotenv/config'
import dbConnection from "./db/config.js";
import posts from "./routes/posts.js";
import path from "path";
import { dirname } from 'path';

const PORT = process.env.PORT || 3030
const app = express()

app.use(cors())
dbConnection()
//DIRECTORIO PUBLICO
app.use(express.static('public'))
//MIDD
app.use(bodyParser.json({limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true }))




app.use('/api/posts', posts)

app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT)
})