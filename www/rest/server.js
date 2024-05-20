
const http=require('http')
const startServer=(app)=>{
    const server=http.createServer(app)
    
    server.listen(5000)
    server.on('listening',()=>{
        console.log(`server is listening on port :${server.address().port}`)
    })
    server.on('error',(err)=>{
        console.log(`Error : ${err}`)
    })
}
module.exports={
    startServer:startServer
}