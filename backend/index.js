const express=require('express')

const bodyParser =require('body-parser')
const cors =require('cors')

const AuthRouter = require('./Routes/AuthRouter')
const TaskRoutes =require('./Routes/TaskRoutes')

const app= express();

//MongoDB Connection
require('dotenv').config()
require('./Models/db')

//Middle Ware
app.use(bodyParser.json())
app.use(cors())
app.use('/auth',AuthRouter)

app.use('/api/tasks', TaskRoutes);

const PORT=8080;
app.get(('/'),(req,res)=>{
    res.send(`App is Listening on Port ${PORT}`)
})


app.listen(PORT,()=>{
    console.log('Server is started')
})