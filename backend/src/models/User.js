// creating user models.
// Making a schema whuichh is bacicallhy defining the structures and fields for the users.
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema= new mongoose.Schema({
    fullName: {
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    bio:{
        type:String,
        default:"",
    },
    profilePic:{
        type:String,
        default:"",

    },
    nativeLanguage:{
        type:String,
        default:"",
    },
    location:{
        type:String,
        default:"",
    },
    isOnboarded:{
        type:Boolean,
        default:false,
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",

    }
]

},{timestamps:true});
// fields like createdAt, updatedAt
// member since and createdAt 







//  pre-save hook(a type of ritual that is done for hashing user passwords before storing in the DB)password hashing
// just b4 we save this userSchema, we run this async function

userSchema.pre("save",async function(next) {
    
    if(!this.isModified("password"))return next();

    try {
        const salt =await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password, salt);

        next();

    } catch (error) {
        next(error)
        
    }
    
});
// 
userSchema.methods.matchPassword=async function (enteredPassword){
//    enteredPassword is the one given by the user and this.password is the one that is already stored in my DB
// bcrypt is basically here comapring the givenPassword with the password stored in  thew DB....then return true false basically a boolean value

    const isPasswordCorrect =await bcrypt.compare(enteredPassword, this.password);
    return isPasswordCorrect;
}

// creating models based out od this schema

const User= mongoose.model("User",userSchema);




export default User;