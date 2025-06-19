const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
require('dotenv').config();
const { Server } = require('socket.io');
let adminRoute =require('./routes/admin.js')
let usersRoute =require('./routes/users.js')
const app = express();
const path = require('path');
const useragent = require("express-useragent");


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST','PUT','DELETE'], 
    credentials: true
  }
});




app.use(express.json());


app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use(useragent.express());

app.use('/admin',adminRoute);
app.use('/users',usersRoute);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});




app.use(express.static(path.join(__dirname, '../AlloBus-front/dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../AlloBus-front/dist/index.html'));
});




const PORT = process.env.PORT || 5500;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log(err));



 