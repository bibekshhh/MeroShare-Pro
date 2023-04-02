import { getUpcomingIPOList, getAvailableIssues, getMyPortfolio, getUserInfo, addAccounts  } from "../controllers/actions.controllers.js";
import { Router } from "express";

const actionsRouter = Router();

actionsRouter
.get("/upcomingIPO", getUpcomingIPOList)
.post("/availableissues", getAvailableIssues)
.post("/portfolio", getMyPortfolio)
.post("/userinfo",  getUserInfo)
.post("/add-account", addAccounts)


export default actionsRouter;