const express = require('express')
const cors = require('cors')
const PORT = 3000
const dotenv = require('dotenv')
const Dbcon = require('./Utils/db.js')
const blogrout = require('./Routes/blogRoutes.js')
const blogauthrout = require('./Routes/authRoutes.js')
const cookieParser = require('cookie-parser')
const app = express()

Dbcon()

app.use(express.json());

app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));

app.use('/blog',blogrout)
app.use('/blog/auth',blogauthrout)

app.get('/',(req,res)=>{
    res.send('test')
})

app.listen(PORT, ()=>{
    console.log(`server runnning on ${PORT}`)
})