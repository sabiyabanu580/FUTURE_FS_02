import express from "express";
import Setting from "../models/Setting.js";

const router = express.Router();

/* GET SETTINGS */
router.get("/", async(req,res)=>{
  const setting = await Setting.findOne();
  res.json(setting);
});

/* SAVE SETTINGS */
router.post("/", async(req,res)=>{

  let setting = await Setting.findOne();

  if(setting){
    Object.assign(setting, req.body);
    await setting.save();
  }else{
    setting = await Setting.create(req.body);
  }

  res.json(setting);
});

export default router;