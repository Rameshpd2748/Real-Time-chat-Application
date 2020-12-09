const express=require('express');
const app=express();
     //create server
const http=require('http').createServer(app);

const PORT=process.env.PORT||3000;
http.listen(PORT,()=>{
    console.log(`server starting at:${PORT}`);
});
app.use(express.static(__dirname+'/Messenger'));
//create routh
  app.get('/',(req,res)=>{
     res.sendFile(__dirname +'/index.html');
  });
  //socket
  const io=require('socket.io')(http); 

  io.on('connection',(socket)=>{
      console.log('New user connected..')
       socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
         });
    });
