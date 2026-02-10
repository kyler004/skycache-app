import SearchLog from "../models/searchLog.js";

export const logSearch = async (req, res) => {
  try {
    const { city } = req.body;
    if (!city) return res.status(400).json({ message: "City required" });

    const newLog = new SearchLog({ city });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLogs = async (req, res) => {
  try {
    const logs = await SearchLog.find();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
