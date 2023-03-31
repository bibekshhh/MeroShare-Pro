import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js";
import applyIPORouter from "./routes/applyIPO.routes.js";
import actionsRouter from "./routes/actions.routes.js";
dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(success => {
    console.log("Sucess: connected to mongodb");
})
.catch(err => {
    console.log(err);
    process.exit(1)
})

app.get("/", (req, res) => {
    res.send("OK")
})
app.use("/auth", authRouter)
app.use("/apply", applyIPORouter)
app.use("/action", actionsRouter)

app.listen(process.env.PORT || 9000, () => {
    console.log(`Success: Listening on port ${process.env.PORT || 9000}`)
})