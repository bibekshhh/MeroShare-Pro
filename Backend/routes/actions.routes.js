import { getUpcomingIPOList, getProfileData, addAccounts, getAllAccounts  } from "../controllers/actions.controllers.js";
import { Router } from "express";

const actionsRouter = Router();

actionsRouter
.get("/upcomingIPO", getUpcomingIPOList)
.post("/profile", getProfileData)
.post("/add-account", addAccounts)
.get("/all-accounts", getAllAccounts)


export default actionsRouter;