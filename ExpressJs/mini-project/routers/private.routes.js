import { Router } from "express";

const router = Router();

router.get("/dashboard" , (req , res)=>{
 

    res.status(200).json({
        message:"Welcome to dashboard page⚙️",
       
    })
})


export default router