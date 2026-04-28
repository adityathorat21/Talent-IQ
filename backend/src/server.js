import express from "express";
import {ENV} from "./lib/env.js";
import path from "path";
import {connectDB} from "./lib/db.js";
import {serve} from "inngest/express";
import {inngest,functions} from "./lib/inngest.js";
import cors from "cors";

const app = express();
const __dirname = path.resolve();

//middleware
app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true})); 

app.use("/api/inngest", serve({client:inngest, functions}))

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
        res.sendFile(path.resolve(__dirname,"../frontend", "dist", "index.html"));
    })
}



const startServer = async() =>{
    try{
        await connectDB();
        app.listen(ENV.PORT, ()=>{
    console.log(`server running at port ${ENV.PORT}`);
});
    }catch(error){
        console.error("error starting the server",error);
    }
}

startServer();