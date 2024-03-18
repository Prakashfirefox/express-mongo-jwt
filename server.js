const express =  require("express"); 
const  {config} =  require("dotenv");
const  {dbConnect} = require("./configs/dbConfig");
const  {router}  = require ("./routes/routes");

const app = express();

config();

dbConnect();

app.use(express.json());

app.use("/api",router);

const port =  process.env.PORT || 3333;

app.listen(port, ()=>{console.log(`Listening on port ${port}...`)});
