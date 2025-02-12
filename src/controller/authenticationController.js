import User from '../model/authenticationModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const secretKey = "secret";
const salt= bcrypt.genSaltSync(saltRounds);

export const AddUser = async (req,res) =>{
    const {username, password, repeatedPassword} = req.body;

    console.log(username)
    console.log(password)
    console.log(repeatedPassword)

    if(password !== repeatedPassword)
        return res.status(400).json({message:"The passwords do not match"})

    var userList = await User.findAll();
    (userList).forEach(u => {
        if(u.username === username)
            return res.status(400).json({message:"Username taken!"});
    })
    await User.create({
        username:username
        ,hashedPassword: bcrypt.hashSync(password,salt)
    })
    
    return res.status(200).json({message:'User '+ username +' created successfully.'});
}

export const LoginUser = async(req,res) => {

      try{
        const username = req.body.username;
        const password = req.body.password;

        if(!username || !password)
          return res.status(400).json({message:"Username and password are required!"});
        
        const user = await User.findOne({
            where:{
                username : username
            }
        });

        var userId = user.get("id")

        if(user)
          if( bcrypt.compare(user.hashedPassword, password, function (err,result){
          
            if(err)
              return res.status(400).json({message:`Incorrect password!`});
            else{
                const token = jwt.sign({username, userId}, secretKey, {"expiresIn":"1h"});
              return res.status(200).json({token});
            }
          }));
      
      }catch (error){
        return res.status(500).json({message:"Internal server error."})
      }
};

export function verifyToken(req, res, next){
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
console.log(header)
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

export default{
    AddUser
    ,LoginUser
    ,verifyToken
}