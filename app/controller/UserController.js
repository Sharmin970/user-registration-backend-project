import UserModel from "../model/UserModel.js"; 
import {TokenEncode} from "../utility/tokenUtility.js";
import { LoginService, registerUserService, ProfileReadService, AllProfilesReadService, UpdateProfileService, DeleteProfileService } from '../service/UserService.js';



export const Registration = async (req, res) => {
    const reqBody = req.body;
    const result = await registerUserService(reqBody); 
    return res.json(result); 
};



export const Login = async (req, res) => {
    try {
        const reqBody = req.body;
        const { token, statusCode, ...response } = await LoginService(reqBody);
        console.log(token)
        
        if (token) {
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, 
                maxAge: 30 * 24 * 60 * 60 * 1000, 
            });
        }

        return res.status(statusCode).json(response);
    } catch (err) {
        return res.status(500).json({ status: "fail", message: err.message });
    }
};




export const SingleProfileDetails = async (req, res) => {
    const userId = req.headers["user_id"]; 
    const { success, data, message } = await ProfileReadService(userId);

    if (!success) {
    return res.status(404).json({ status: "fail", message });
    }

    return res.status(200).json({ status: "success", message, data });
};



export const AllProfileDetails = async (req, res) => {
    const { success, data, message } = await AllProfilesReadService();

    if (!success) {
        return res.status(500).json({ status: "fail", message });
    }

    return res.status(200).json({ status: "success", message, data });
};



export const UpdateProfileDetails = async (req, res) => {
    const userId = req.headers["user_id"];
    const updateData = req.body;

    const { success, message } = await UpdateProfileService(userId, updateData);

    if (!success) {
        return res.status(400).json({ status: "fail", message });
    }

    return res.status(200).json({ status: "success", message });
};


export const DeleteProfile = async (req, res) => {
    const userId = req.headers["_id"]; 
    const profileId = req.params.id; 

    const { success, data, message } = await DeleteProfileService(userId, profileId);

    if (!success) {
        return res.status(404).json({ status: "fail", message });
    }

    return res.status(200).json({ status: "success", message, deletedUser: data });
};


