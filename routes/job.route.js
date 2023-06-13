const {Router}=require("express");
const jobModel=require("../model/job.model");
const jobRoute=Router();



jobRoute.post("/add" ,async(req,res)=>{
    const payload=req.body;
    try {
        const job=new jobModel(payload);
        await job.save();
        res.status(200).send({"msg":"new job post added to the database"});
    } catch (error) {
        res.status(400).send(error.message);
    }
})

jobRoute.get("/", async(req,res)=>{
    try {
        const job=await jobModel.find(req.query);
        res.status(200).send(job);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


jobRoute.get("/:jobID", async(req,res)=>{
    const {jobID}=req.params;
    try {
        const job= await jobModel.findById(jobID);
        res.status(200).send(job);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


jobRoute.get("/page/:no", async(req,res)=>{
    const page=+req.params.no;
    try {
       const startFrom=(page-1)*10;
       const job=await jobModel.find().skip(startFrom).limit(10);
        res.status(200).send(job);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

jobRoute.patch("/update/:jobID", async(req,res)=>{
        const payload=req.body;
        const {jobID}=req.params;
    try {
        await jobModel.findByIdAndUpdate({_id:jobID},payload);
         res.status(200).send({"msg":"job details has been updated"});
    } catch (error) {
        res.status(400).send(error.message);
    }
})

jobRoute.delete("/delete/:jobID" ,async(req,res)=>{
    const {jobID}=req.params;
    try {
        await jobModel.findByIdAndDelete(jobID);
        res.status(200).send({"msg":"job details has been deteted"});
    } catch (error) {
        res.status(400).send(error.message);
    }
})
module.exports=jobRoute;


