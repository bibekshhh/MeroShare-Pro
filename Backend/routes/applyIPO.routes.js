import { SingleApplyIPO } from "../controllers/applyIPO.controllers.js";
import { Router } from "express";


const applyIPORouter = Router();

applyIPORouter.post("/single", SingleApplyIPO);

export default applyIPORouter;