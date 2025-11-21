import { Router } from "express";

const userRouter = Router();

userRouter.get("/getAllUser", (req, res) => {
    res.send("Get All Users")
})

export default userRouter;