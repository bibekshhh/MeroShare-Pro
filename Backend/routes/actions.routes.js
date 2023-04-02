import { getUpcomingIPOList, getProfileData, addAccounts, getAllAccounts, editAccount, deleteAccount  } from "../controllers/actions.controllers.js";
import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js"

const actionsRouter = Router();

actionsRouter
.get("/upcomingIPO", getUpcomingIPOList)
.post("/profile", getProfileData)
.post("/add-account", isLoggedIn,addAccounts)
.get("/all-accounts", isLoggedIn,getAllAccounts)
.post("/edit-account", isLoggedIn,editAccount)
.post("/delete-account", isLoggedIn,deleteAccount)


export default actionsRouter;