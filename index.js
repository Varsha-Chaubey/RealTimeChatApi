const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();


const userRoutes = require('./routes/UserRoutes')

// const socketID = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json())

app.use('/api/auth', userRoutes)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUniFiedTopology: true,
}).then(() => {
    console.log('DB connected')
}).catch((err) => {
    console.log(err.message)
})


// const users =[{}];



const server = app.listen(process.env.PORT, () => {
    console.log(`This server is working on http://localhost:${process.env.PORT}`)
})

// const io=socketID(server)

// io.on('connection', (socket)=>{
//     console.log('new connection')
//     // socket.on => recieved data from frontend(client)

//     socket.on('joined', ({userDetails})=> {
//         users[socket.id] = userDetails;
//         console.log(`${userDetails} has joined`);
//         socket.broadcast.emit('userJoined', {user:'Admin', message:`${users[socket.id]} has joined`})
//         socket.emit('welcome', {user:'Admin', message:`welcome to the chat, ${users[socket.id]}`})
//     })

//     socket.on('disconnectUser', ()=> {
//         socket.broadcast.emit('leave', {user:'Admin', message:`${users[socket.id]} has left`})
//         console.log('user left')
//     })
// })
