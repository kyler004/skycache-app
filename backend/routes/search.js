import express from 'express'; 
import { logSearch, getLogs } from '../controllers/searchController.js'; 

const router = express.Router(); 

router.post('/log', logSearch); 
router.get('/logs', getLogs); 

export default router; 