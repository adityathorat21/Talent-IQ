import express from "express";
import {ENV} from "./lib/env.js";
import path from "path";

const app = express();
const __dirname = path.resolve();


app.get("/health", (req,res)=> {
res.status(200).send("health route!")
})

app.get("/books", (req,res)=> {
res.status(200).send("books end point")
})

//making our app ready for deployment
// THIS WILL SHOW THE FRONTEND VITE APP ON THE BACKEND SERVER, SHOWING THE FRONT AND AND BACKEND ON SAME SITE
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    
    app.get("/{*any}", (req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"));
    })
}

app.listen(ENV.PORT, ()=>{
    console.log(`server running at port ${ENV.PORT}`);
});