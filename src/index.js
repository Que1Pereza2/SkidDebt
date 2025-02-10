import express from 'express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;
const secretKey = "secret";

app.set('port', process.env.PORT || 300);
app.set('json spaces',2);

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json())

// • POST /api/auth/register → signing up a new user.
app.put("/Register", (req,res) =>{

  // if(password !== repeatedPassword)
  //   return res.status(400).json({message:"The passwords do not match"})

});

// • POST /api/auth/login → Logging in a user and generating the JWT token.
app.post("/Login", (req,res) =>{
  try{
    const username = req.body.username;
    const password = req.body.password;
    
    if(!username || !password)
      return res.status(400).json({message:"Username and password are required!"});
    
    if(username === "admin" && password === "admin"){
      const token = jwt.sign({username}, secretKey, {"expiresIn":"1h"});
      return res.status(200).json({token});
    } else
      return res.status(401).json({message:"Authentication failed"});
  
  }catch (error){
    return res.status(500).json({message:"Internal server error."})
  }
});

function verifyToken(req, res, next){
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token)
    return res.status(401).json({message:"Token not provided!"});

  try{
    const payload = jwt.verify(token,secretKey);
    req.username = payload.username;
    next();
  }catch(error){
    return res.status(403).json({message:"Token not valid!"});
  }
}

app.get("/protected", verifyToken, (req,res) => {
  return res.status(200).json({message:"You have access!"});
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Authentication
// Subscriptions
// • POST /api/subscriptions → Create a new subscription (requires authentication).
// • GET /api/subscriptions → Show all subscriptions (requires authentication).
// • PUT /api/subscriptions/:id → Modify an existing subscription (requires authentication).
// • DELETE /api/subscriptions/:id → Eliminate a subscription (requires authentication).


app.listen(port, () => {
  console.log(`Server listen on http://localhost:${port}`);
});