/**
 * This class is the controller for the authentication. It manages the logic and
 * what is returned when a function is called.
 */

// Imports the User so we can access the database and the model.
import User from '../model/authenticationModel.js';

// Imports bycript to hash the passwords and conpare them.
import bcrypt from 'bcrypt';

// Imports JWT used for authentication.
import jwt from 'jsonwebtoken';

// Used for the generation of a salt.
const saltRounds = 10;
const salt= bcrypt.genSaltSync(saltRounds);

// The secret key used to sign the token. 
const secretKey = "secret";

/**
 * This function recieves the user details, checks to see if they are adequate
 *  and returns an error or a message indicating the user has been created.
 * 
 * @param {username, password, repeatedPassword} req - Contains the 
 * authentication data used to create a new user.
 * @param {message} res - Returns a message indicating if the user was created 
 * successfully or not. 
 * 
 * @returns res
 */
export const AddUser = async (req,res) =>{
    const {username, password, repeatedPassword} = req.body;

    if(password !== repeatedPassword)
        return res.status(400).json({message:"The passwords do not match"})

    // Check to see if the username is already taken.
    var userList = await User.findAll();
    let userExists = false 

    userList.forEach(u => {
        if(u.username === username)
          userExists = true;
        })
    
    if(userExists)
      return res.status(400).json({message:"Username taken!"});
   
    await User.create({
        username:username
        ,hashedPassword: bcrypt.hashSync(password,salt)
    })
    
    return res.status(200).json({message:'User '+ username + ' created successfully.'});
}

/**
 * This funtion checks the credentials provided by the user trying to login.
 * 
 * If they are incorrect or can't be found in the database it returns an 
 * adequate error.
 * 
 * If they are correct it returns a login token.
 * 
 * @param {username, password} req - The username and password of the user.
 * @param {message} res - An error message or a login token.
 * @returns res
 */
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

/**
 * This function checks the validity of the token provided by the user returns 
 * an apropiate response depending if the token is valid of not.
 * 
 * If the token is valid it allows the next funtion to be executed, if it 
 * expired or it's missing it returns an error message.
 * 
 * @param {header} req - The header where the token that needs verification is 
 * located.
 * @param {message} res - The error message depending on the token's state.
 * @param {function} next - The next funtion to be executed if the token is 
 * valid. 
 * 
 * @returns res - With the appropiate error message depending on the token's 
 * state. 
 */
export function verifyToken(req, res, next){
  // Here the token is extracted from the header.
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

export default{
    AddUser
    ,LoginUser
    ,verifyToken
}