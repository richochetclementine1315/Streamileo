import {StreamChat} from "stream-chat";
import "dotenv/config";

const apiKey=process.env.STREAM_API_KEY
const apiSecret= process.env.STREAM_API_SECRET


if(!apiKey || !apiSecret){
    console.error("Stream API key or secret key is missing");
}
const streamClient= StreamChat.getInstance(apiKey, apiSecret);

// Function that will allow us to create users

export const upsertStreamUser= async (userData)=>{
    try{
        await streamClient.upsertUsers([userData]); //upsert means either create new or update the existing
           return userData
    }catch(error){
        consol.error("Error upserting stream user:", error)

    }

};

// TODO: do it later
export const generateStreamToken=(userId)=>{
    try {
        //make sure user id is a string

        const userIdStr= userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.error("Error generating Stream Token:", error)
        
    }

};
