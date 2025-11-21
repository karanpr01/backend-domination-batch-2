import { Router } from "express";

const router = Router();

router.get("/generate-token", (req,res) => {
    // todo: calling a utils method to create a random token

    const token = "token";

    res.status(200).json({
        message: "Token Generated Successfully",
        data: token
    })
})

router.get("/", (req,res) => {
    res.status(200).json({
        message: "Welcom to HomePage",
        
    })
})

export default router;