const express = require("express");
const router = express.Router();
const Lead = require("./Lead");

/* ADD LEAD */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        message: "Name and Phone required"
      });
    }

    const newLead = new Lead({
      name,
      email,
      phone,
      status: "New"
    });

    await newLead.save();

    res.json(newLead); // ✅ return lead directly
  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET ALL LEADS */
router.get("/", async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* DASHBOARD STATS */
router.get("/stats", async (req, res) => {

  const totalLeads = await Lead.countDocuments();

  const newLeads = await Lead.countDocuments({
    status: "New"
  });

  res.json({
    totalLeads,
    newLeads
  });
});

module.exports = router;