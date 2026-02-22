import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema({
  companyName:String,
  adminEmail:String,
  theme:{
    type:String,
    default:"dark"
  }
});

export default mongoose.model("Setting", SettingSchema);