import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUsers, getMyFriends, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingFriendReqs } from "../controllers/user.controller.js";

const router= express.Router();
// apply auth middleware to all routes
router.use(protectRoute);
// Route to get the recommended users
router.get("/",getRecommendedUsers);
// Route to ghet my friends
router.get("/friends",getMyFriends);
// route to send friend request
router.post("/friend-request/:id", sendFriendRequest); //btw id is dynamic 
// router for accepting friend request
router.put("/friend-request/:id/accept", acceptFriendRequest);
//In the notification this shows the pending srequest and the newly accepted ones
router.get("/friend-requests", getFriendRequests);
// requests that we have sent.
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);




export default router;