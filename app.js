const http = require('http')
const { json } = require('stream/consumers')
const url = require('url')
var port =3000
var data=[]

const server = http.createServer(function(req,res){

    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname

    if(method==='GET' && path=== '/items'){
         res.write(JSON.stringify(data))
         res.end()     
    }
   
    if(method==='POST' && path==='/post'){
        var body= ''
        req.on('data',chunk=>{
            body+=chunk.toString();
        })
        req.on('end',()=>{
            const newItem= JSON.parse(body)
            data.push(newItem)
             res.write(JSON.stringify(data))
             res.end()
        })
    }

 
else if (path.startsWith('/items/') && method === 'DELETE') {
 
    const id = parseInt(path.split('/')[2], 10);
    items = items.filter(item => item.id !== id);
    res.writeHead(204);
    res.end();
}})


server.listen(port,function(error){
    if(error){
        console.log('something went wrong',error);
        
    }else{
        console.log('server is listening on port'+port);
        
    }
})

