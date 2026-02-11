import express from "express";
import { getWeather } from "../controllers/weatherController.js";

const router = express.Router();

router.get("/", getWeather); // /api/weather?city=Paris

export default router;
