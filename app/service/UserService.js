import UserModel from "../model/UserModel.js"; 
import { TokenEncode } from "../utility/tokenUtility.js";

export const registerUserService = async (userData) => {
    try {
        await UserModel.create(userData);
        return { status: "success", message: "User registered successfully" };
    } catch (error) {
        return { status: "fail", message: error.toString() };
    }
};


export const LoginService = async (reqBody) => {
    try {
        const { phoneNumber, password } = reqBody;

        
        if (!phoneNumber || !password) {
            return { statusCode: 400, status: "fail", message: "Phone number and password are required" };
        }

        
        const user = await UserModel.findOne({ phoneNumber:phoneNumber, password:password });
        if (!user) {
            return { statusCode: 404, status: "fail", message: "Invalid phone number or password" };
        }

        
        const token = TokenEncode(user.phoneNumber, user._id);

        return { statusCode: 200, status: "success", message: "Login successful", token };
    } catch (err) {
        return { statusCode: 500, status: "fail", message: err.message };
    }
};



export const ProfileReadService = async (userId) => {
    try {
    console.log(userId)
    const user = await UserModel.findOne({ _id: userId });

    
    if (!user) {
        return { success: false, message: "User not found", data: null };
    }

    return { success: true, message: "User Profile Details successful", data: user };
    } catch (error) {
    return { success: false, message: "Error fetching user profile", data: null };
    }
};



export const AllProfilesReadService = async () => {
    try {
        const users = await UserModel.find({}); // Fetch all users

        if (users.length === 0) {
            return { success: false, message: "No users found", data: null };
        }

        return { success: true, message: "All User Profiles successfully retrieved", data: users };
    } catch (error) {
        return { success: false, message: "Error fetching all user profiles", data: null };
    }
};



export const UpdateProfileService = async (userId, updateData) => {
    try {
        
        const result = await UserModel.updateOne({ _id: userId }, updateData);

        if (result.matchedCount === 0) {
            return { success: false, message: "User not found" };
        }

        return { success: true, message: "User profile updated successfully" };
    } catch (error) {
        return { success: false, message: "Error updating user profile: " + error.message };
    }
};



export const DeleteProfileService = async (userId, profileId) => {
    try {
        
        const user = await UserModel.findOne({ _id: profileId });

        if (!user || user._id.toString() !== userId) {
            return { success: false, message: "User not found or unauthorized to delete", data: null };
        }

        
        const result = await UserModel.deleteOne({ _id: profileId });

        if (result.deletedCount === 0) {
            return { success: false, message: "User deletion failed", data: null };
        }

        return { success: true, message: "User profile deleted successfully", data: user };
    } catch (error) {
        return { success: false, message: "Error deleting user profile: " + error.message, data: null };
    }
};

































