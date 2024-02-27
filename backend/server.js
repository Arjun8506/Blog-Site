import express from "express"
import dotenv from "dotenv"
import ConnectToDB from "./db/connectToDB.js"
import userRoutes from "./routes/user.route.js"
import blogRoutes from "./routes/blog.route.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()

app.use(cookieParser())
app.use(express.json())

const port = process.env.PORT || 8000

app.get("/", (req, res)=> {
    res.status(200).send("Hello World")
})

app.use("/api/auth", userRoutes)
app.use("/api/blog", blogRoutes)

app.listen(port, ()=> {
    ConnectToDB()
    console.log(`Server is running on ${port} Port.`);
})