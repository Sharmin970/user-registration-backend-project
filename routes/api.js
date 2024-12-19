import express from "express";
const router = express.Router();

import * as UserController from "../app/controller/UserController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";

// User Routes
router.post("/Registration", UserController.Registration); // Registration route

router.post("/Login", UserController.Login); // Login route

router.get("/SingleProfileDetails", AuthMiddleware, UserController.SingleProfileDetails); // Single profile details route

router.get("/AllProfileDetails", AuthMiddleware, UserController.AllProfileDetails);   // All profile details route

router.put("/UpdateProfileDetails", AuthMiddleware, UserController.UpdateProfileDetails); // Single profile update route

router.delete("/DeleteProfile/:id", AuthMiddleware, UserController.DeleteProfile); // Single Profile delete route



export default router;
