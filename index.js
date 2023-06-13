const express=require("express");
const connection=require("./db");
const jobRoute=require("./routes/job.route");
require("dotenv").config();
const app=express();
const cors=require("cors");

app.use(express.json());
app.use("/job",jobRoute);
app.use(cors());


app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("connected to db");
    } catch (error) {
        console.log(error.message);
    }
    console.log(`server is running at port ${process.env.port}`);
})