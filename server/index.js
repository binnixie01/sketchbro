import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials:true
  } });
  app.use(cors())
io.on("connection", (socket) => {
  console.log("connected");
  socket.on("disconnect",()=>{console.log("disconnected");
  })
  socket.on('drawing',(data)=>{
    socket.broadcast.emit('drawing',data)
  })
  
});

httpServer.listen(3000);