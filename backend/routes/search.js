import express from "express";
import {
  logSearch,
  getLogs,
  deleteAllLogs,
} from "../controllers/searchController.js";

const router = express.Router();

router.post("/log", logSearch);
router.get("/logs", getLogs);
router.delete("/", deleteAllLogs);

export default router;
