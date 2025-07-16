import express from "express";
 import { protectRoute } from "../middleware/auth.middleware.js";
 import { getStreamToken } from "../controllers/chat.controller.js";


 const router= express.Router();

router.use(protectRoute);
// Generate a stream token for us...
router.get("/token", getStreamToken);



 export default router;