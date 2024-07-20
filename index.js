const express = require('express');
const urlRoute = require("./routes/url")
const staticRoute = require('./routes/staticRouter') 
const userRoute = require('./routes/user');
const cookieParser = require("cookie-parser")
const {restrictToLoggedInUsersOnly, checkAuth} = require("./middlewares/auth")

const path = require('path');
const {connectMongoDB} = require("./connect")
const URL = require("./models/url.models")
const app = express();

const PORT = 8001;

//MongoDB connect
connectMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());

//routes
app.use('/',checkAuth,staticRoute);
app.use("/url",restrictToLoggedInUsersOnly,urlRoute);
app.use("/user",userRoute)

app.get('/url/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
      shortId,
    },
    {$push:{
        visitHistory: {timestamp:Date.now()},
    }
    })
    res.redirect(entry.redirectURL)
});

app.listen(PORT, ()=>console.log("Server Started at PORT:",PORT));