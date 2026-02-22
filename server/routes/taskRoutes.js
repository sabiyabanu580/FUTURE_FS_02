import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

/* GET TASKS */
router.get("/", async (req,res)=>{
  const tasks = await Task.find().sort({createdAt:-1});
  res.json(tasks);
});

/* ADD TASK */
router.post("/", async (req,res)=>{
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

/* UPDATE STATUS */
router.put("/:id", async (req,res)=>{
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
  res.json(task);
});

/* DELETE */
router.delete("/:id", async(req,res)=>{
  await Task.findByIdAndDelete(req.params.id);
  res.json({message:"Deleted"});
});

export default router;