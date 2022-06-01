const express = require("express")
const cors = require("cors")
const mongoose=require("mongoose")
var authRouter=require("./routes/auth.router")
const conn=require("./env/config")
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000
mongoose.connect(conn.connectionString ,{  useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("Connection to created DB Succesful"))
.catch((err)=>console.log(err));

app.use("/",authRouter)



app.listen(port, (error, success) => {
  if (error) {
  } else {
    console.log("Server is listening at:" + port)
  }
})