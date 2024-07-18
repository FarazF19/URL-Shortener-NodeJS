const express = require('express');
const urlRoute = require("./routes/url")
const {connectMongoDB} = require("./connect")
const URL = require("./models/url.models")
const app = express();

const PORT = 8001;

//MongoDB connect
connectMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("MongoDB connected"));

app.use(express.json());

//routes
app.use("/url",urlRoute);
app.get('/:shortId',async (req,res)=>{
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