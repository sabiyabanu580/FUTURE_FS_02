import express from "express";
import Lead from "../models/Lead.js";
import Task from "../models/Task.js";

const router = express.Router();

router.get("/summary", async (req,res)=>{

  const totalLeads = await Lead.countDocuments();
  const newLeads = await Lead.countDocuments({status:"New"});
  const contacted = await Lead.countDocuments({status:"Contacted"});
  const tasks = await Task.countDocuments();

  res.json({
    totalLeads,
    newLeads,
    contacted,
    tasks
  });
});

export default router;