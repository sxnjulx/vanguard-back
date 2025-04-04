const express = require("express")
const cors = require('cors')
const blogRoutes = require("./routes/blogRoutes")
const imageRoutes = require("./routes/imageRoutes")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const projectRoutes = require("./routes/projectRoutes")
require('dotenv').config()

const app = express()
app.use(express.json())
// app.use(cors())

app.use(cors({
    origin: 'http://localhost:3002',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));
  


connectDB()

const PORT =  process.env.PORT || 3000


app.use("/blog",blogRoutes )
app.use("/project",projectRoutes)
app.use("/image",imageRoutes )
app.use("/user", userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})