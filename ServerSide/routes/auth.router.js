const express=require("express");
const authController=require("../controllers/auth.controller")
const router=express.Router();

router.post("/login",authController.login)

router.post("/register",authController.register)

router.get("/getUsers",authController.getUsers)

router.delete("/deleteUser/:id",authController.deleteUser)

router.get("/getUserDetails/:id",authController.getUserDetails)

router.put("/update/:id",authController.update)

module.exports=router;
