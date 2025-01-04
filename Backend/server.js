const express = require('express');
const app = express();
const PORT = 4000;
const routeFile = require("./route/routeFile") ; 
const dbconfig = require("./config/dbconfig") ; 
const cookieParser = require('cookie-parser') ; 
const cors = require('cors');

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());  
app.use(cors({
  origin: 'http://localhost:3000', // React app's origin
  credentials: true // Allow credentials (cookies) to be sent
})) ;

dbconfig() ; 
app.use('/api' , routeFile) ; 

app.get("/bankai" , (req , res) => {
  res.json({message : "janka no tacchi"})
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
