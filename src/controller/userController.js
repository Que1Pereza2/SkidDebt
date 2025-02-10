import User from '../model/userModel.js';
import bcrypt from 'bcrypt';

const salt = 10;
export const AddUser = async (req,res) =>{
    const {username, password, repeatedPassword} = req.body;

    if(password !== repeatedPassword)
        return res.status(400).json({message:"The passwords do not match"})

    var userList = User.findAll();
    (await userList).forEach(u => {
        if(u.username === username)
            return res.status(400).json({message:"Username taken!"});
    })

    //hash password
    var hashedPassword = hashPassword(password);

    User.create({
        username:username
        ,hashedPassword: hashedPassword
    })
    
    return res.status(200).json({message:'User '+ username +' created successfully.'});
}

export const LoginUser = async(req,res) => {
    const {username, password} = req.body;

    const user = User.find({
        where:{
            username : username
        }
    });

    // var hashedPassword = hash password here 

    if(user)
        if(user.hashedPassword === hashPassword(password))
            return res.status(200).json({message:'Passwords match!'});
        else
            return res.status(400).json({message:`Passwords don't match!`});
        
}

function hashPassword(req,res){
    
    
    bcrypt.hash(req.password, salt, (err, hash) =>{
        if(err){
            return res.json({message:'nono'})
        }
        return res.json({hashedPassword:hash})
    })
}