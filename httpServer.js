import http from "http";
import fs from "fs";

http.createServer(function(req,res){
    const petRegExp = /^\/pets\/(\d+)$/;
    if(req.method ==='GET' && req.url === "/pets"){
        fs.readFile("pets.json","utf-8", (error,string) =>{
            res.setHeader("Content-Type", "application/json")
            res.write(string);
            res.end();
        })
    }else if(req.method === 'GET' && petRegExp.test(req.url)){
        const petIndex = Number(req.url.match(petRegExp)[1]);
        fs.readFile("pets.json","utf-8", (error,string) =>{
            res.setHeader("Content-Type", "application/json");
            const pets = JSON.parse(string);
            const pet = pets[petIndex];
            
            if(petIndex > pets.length - 1 || petIndex < 0){
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/plain");
                res.end("Not Found");
            }
            res.end(JSON.stringify(pet));
        })
    }else{
        res.end();
    }
    
})
.listen(3000, function(){
    console.log("listening on port 3000")
});