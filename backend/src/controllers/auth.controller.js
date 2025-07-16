// import { upsertStreamUser } from "../lib/stream.js";
// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// export async function signup(req,res){
//    const {email,password,fullName} =req.body;


//    try {
//     // Empyt firld check
//     if(!email || !password || !fullName){
//         return res.status(400).json({message: "Kindly fill all the Fields!"});
//     }
//     // password length checks
//     if(password.length < 6){
//         return res.status(400).json({message: "Password mustbe at least 6 charecters"});
//     }
//     // Check for valid email
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//     if(!emailRegex.test(email)){
//         return res.status(400).json({message: "Invalid Email format!"})
//     }
//     // check if user already extis
//     const existingUser= await User.findOne({email});
//     if(existingUser){
//         return res.status(400).json({message:"User with same email exists!"})
//     }
//     // For user avatar selection.....
//        const index=Math.floor(Math.random()*100)+1;    //generate a random number between 1 and 100

//        const randomAvatar=`https://avatar.iran.liara.run/public/${index}.png`;
//     //    create new user
//        const newUser= await User.create({
//         email,
//         fullName,
//         password,
//         profilePic:randomAvatar,
//        });
    
//       try{
//          await upsertStreamUser({
//         id:newUser._id.toString(),
//         name:newUser.fullName,
//         image:newUser.profilePic|| "",
//       });
//       console.log(`Stream user Created for ${newUser.fullName}`)

//       }catch(error){
//         console.log("Error Creating Stream User:(",error);

//       }






//     //    Creating JSON Web Tokens

//     const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET_KEY,{
//         expiresIn: "15d"
//     });
//     // response cookies
//     res.cookie("jwt",token,{
//         maxAge: 15*24*60*60*1000, //millisecond format.
//         httpOnly: true,  //prevents from the XSS attacks
//         // sameSite: "strict", //prevents HTTP requests
//         sameSite: "strict",//
//         secure: process.env.NODE_ENV==="production" // During productionit will not take HTTP requests but during development stage it wiol.

//     })
//     // sending back to user.
//     res.status(201).json({success: true, user:newUser})    //201 code means basiically something has been created in db



    
//    } catch (error) {
//     console.log("Error in signup controller", error);
//     res.status(500).json({message: "Internal Server Error"});
    
//    }



    
// }
// // export async function login(req,res){
// //     res.send("login Routes");
// // }

// export async function login(req,res){
//     try {
//         const {email,password}= req.body;

//         if(!email || !password){
//             return res.status(400).json({message:"All fields are required!"})
//         }
//         const user= await User.findOne({email});
//         if(!user) return res.status(401).json({message:"invalid email or password!"});

//         const isPasswordCorrect= await user.matchPassword(password);
//         if(!isPasswordCorrect)return res.status(401).json({message:"Invalid email or password!"});

//         // creating JSON Web Token
//         const token =jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY,{
//             expiresIn:"15d",
//         });
//          res.cookie("jwt", token,{
//             maxAge:15*24*60*60*1000, //in milliseconds
//             httpOnly: true, //Prevents XSS attacks
//             sameSite: "strict",//prevents CSRF attacks
//             secure:process.env.NODE_ENV=== "production",
//          });
//           res.status(200).json({success:true, user});


//     } catch (error) {
//         console.log("Error in login controller", error.message);
//         res.status(500).json({message:"Internal Server Error!"})
        
//     }
// }
// export  function logout(req,res){
// //    Logout means we need to clear all their cookies first.
// res.clearCookie("jwt");
// res.status(200).json({success:true, message:"You are successfully logged out!"});

// }

// export async function onboard(req, res){
//     try {
//         const userId= req.user._id

//         const {fullName,bio,nativeLanguage, learningLanguage, location}=req.body
//         if(!fullName|| !bio|| !nativeLanguage || !learningLanguage|| ! location){
//             return res.status(400).json({message:"All fields are required",
//                 missingFields:[
//                     !fullName && "fullName",
//                     !bio&&"bio",
//                     !nativeLanguage && "nativeLanguage",
//                     !learningLanguage&& "learningLanguage",
//                     !location&& !location,
//                 ].filter(Boolean),
//             });
//         }
//        const updatedUser= await User.findByIdAndUpdate(userId,{
//         ...req.body,
//         isOnboarded: true,
//        },

//        {new:true}//this give u the updated user
    
//     );
//     if(!updatedUser) return res.status(404).json({message:"User Not Found!"});
//     // We will update user in Stream as well

//     } catch (error) {
//         console.error("Onboarding Error!",error);
//         res.status(500).json({message:"Internal Server Error Occured!"});
//     }
// }
import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// --------------------- Signup ---------------------

export async function signup(req, res) {
  const { email, password, fullName } = req.body;

  try {
    // Empty field check
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "Kindly fill all the fields!" });
    }

    // Password length check
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    // Email format check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with the same email already exists!" });
    }

    // Generate random avatar
    const index = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${index}.png`;

    // Create new user
    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomAvatar,
    });

    // Create Stream user
    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`✅ Stream user created for ${newUser.fullName}`);
    } catch (error) {
      console.log("❌ Error creating Stream user:", error);
    }

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15d",
    });

    // Set cookie
    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    // Send response
    res.status(201).json({ success: true, user: newUser });

  } catch (error) {
    console.log("❌ Error in signup controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// --------------------- Login ---------------------

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Field check
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password!" });

    // Validate password
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password!" });

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15d",
    });

    // Set cookie
    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    // Send response
    res.status(200).json({ success: true, user });

  } catch (error) {
    console.log("❌ Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// --------------------- Logout ---------------------

export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "You are successfully logged out!" });
}

// --------------------- Onboarding ---------------------

export async function onboard(req, res) {
  try {
    const userId = req.user._id;
    const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

    // Check all fields
    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        message: "All fields are required!",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User Not Found!" });

    // Update Stream user
    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
      console.log(`✅ Stream user updated after onboarding for ${updatedUser.fullName}`);
    } catch (streamError) {
      console.log("❌ Error updating Stream user:", streamError);
    }

    // Send response
    return res.status(200).json({ success: true, user: updatedUser });

  } catch (error) {
    console.error("❌ Onboarding Error:", error);
    res.status(500).json({ message: "Internal Server Error Occurred!" });
  }
}
