import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req,res) {
    try {
        const currentUserId= req.user._id;
        const currentUser=req.user;

        const recommendedUsers= await User.find({
            $and:[
                {_id: {$ne: currentUserId}}, //excluding current users
                {_id: {$nin:currentUser.friends}}, //excluding current user's friends
                {isOnboarded: true}, //only those whose onboarding is doen.
            ],

        });
       
        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.error("Error in getRecommendedUsers controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
        
    }
}

export async function getMyFriends(req,res){
    try {
        const user = await User.findById(req.used.id)
        .select("friends")
        .populate("friends","fullName profilepic nativeLanguage learningLanguage")
        
        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error in getMyFriends controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
        
    }
    
}
export async function sendFriendRequest(req,res){
    try{
        const myId= req.user.id;
        const {id: recipientId}= req.params;
      //avoiding sending request to myself actually...
        if(myId=== recipientId){
            return res.status(400).json({message:"You cannot sent request to yourself!"})
        }
        //If no such recipient exists(check)...
        const recipient= await User.findById(recipientId);
        if(!recipient){
            return res.status(404).json({message:"Recipient Not found!"})
        }

        // Check if user is already friends
        if(recipient.friends.include(myId)){
            return res.status(400).json({message:"You are already friend with this user!"})
        }
        // check if request already exists...
        const existingRequest= await FriendRequest.findOne({
            //checking in the database if I have sent a request to this user or this user sent a request to me.
            //  if yes then it means that there is alread a requestbetween us
            $or:[
                {sender: myId, recipient: recipientId},
                {sender:recipient, recipient: myId},
            ],

        });
        if(existingRequest){
            return res.status(400).json({message:"A friend request already exists"})
                
            }
            // creating a friend request in the Database.
            const friendRequest= await FriendRequest.create({
                sender: myId,
                sender: recipientId,
            });
            res.status(201).json(friendRequest);

    }catch(error){
        console.error("Error in sendFriendRequest controller", error.message);
        res.status(500).json({message:"Internal Server Error!"})

    }
}
 export async function acceptFriendRequest(req,res){
    try{
        const {id: requestId}= req.params;
        const friendRequest = await FriendRequest.findById(requestId)
        //checking if a friend request with requestId edexists or not
        if(!requestId){
            return res.status(404).json({message:"Friend request not found!"});

        }
        // Verifying that whether its me who is  the reciepient 
        if(friendRequest.recipient.toString()!== req.user.id){
            return res.status(403).json({message: "You are not authorized to accept this request!"});

        }
        friendRequest.status="Accepted";
        await friendRequest.save();

        // add the users on eachj other's friendlist, which is an array. $addToSet
        await User.findByIdAndUpdate(friendRequest.sender ,{
            $addToSet: {friends: friendRequest.recipient},
        });
         await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: {friends: friendRequest.sender},
         });

         res.status(200).json({message:"Friend Request Accepted!"});

    }catch(error){
        console.log("Error in acceptingfriendRequest controller", error.message);
        res.status(500).json({message:"Internal Server Error"});

    }
 }
  export async function getFriendRequests(req, res){
    try{
        const incomingReqs= await FriendRequest.find({
            recipient: req.user.id,
            status:"pending",

        }).populate("sender","fullName profilePic nativeLanguage learningLanguage");

        const acceptedReqs= await FriendRequest.find({
            sender: req.user.id,
            status: "accepted",
        }). populate("recipient", "fullName profilePic");

        res.status(200).json({incomingReqs, acceptedReqs});

    }catch(error){
        console.log("Error in getPendingFriendRequests controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }

  }
   export async function getOutgoingFriendReqs(req, res){
    try{
        const outgoingRequests= await FriendRequest.find({
         sender: req.user.id,
         status:"pending",
        }).populate("recipient","fullName profilePic nativeLanguage learninglanguage");

        res.status(200).json(outgoingRequests);
    }catch(error){
        console.log("Error in getOngoingrequests controller", error.message);
        res.status(500).json({message:"Internal Server Error!"});

    }
   }
