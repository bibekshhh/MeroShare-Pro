import { getUpcomingIPOList, getProfileData, addAccounts, getAllAccounts, editAccount, deleteAccount, getRecentApplications  } from "../controllers/actions.controllers.js";
import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import { getShareDetails } from "../controllers/actions.controllers.js";

const actionsRouter = Router();

actionsRouter
.get("/upcomingIPO", getUpcomingIPOList)
.post("/profile", getProfileData)
.post("/recent-applications", getRecentApplications)
.post("/add-account", isLoggedIn, addAccounts)
.get("/all-accounts", isLoggedIn, getAllAccounts)
.post("/edit-account", isLoggedIn, editAccount)
.post("/delete-account", isLoggedIn, deleteAccount)

// .get("/share-details", isLoggedIn, getShareDetails)


export default actionsRouter;