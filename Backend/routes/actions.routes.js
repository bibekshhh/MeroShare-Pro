import { getUpcomingIPOList, getAvailableIssues, getMyPortfolio, getUserInfo, addAccounts, getAllAccounts  } from "../controllers/actions.controllers.js";
import { Router } from "express";

const actionsRouter = Router();

actionsRouter
.get("/upcomingIPO", getUpcomingIPOList)
.post("/availableIssues", getAvailableIssues)
.post("/portfolio", getMyPortfolio)
.post("/userinfo",  getUserInfo)
.post("/add-account", addAccounts)
.get("/all-accounts", getAllAccounts)


export default actionsRouter;