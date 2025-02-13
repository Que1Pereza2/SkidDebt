/**
 * This class is the controller for the subscription. It manages the logic and
 * what is returned when a function is called.
 */

// Imports the Subscription so we can access the database and the model.
import Subscription from '../model/subscriptionModel.js';

// Imports JWT used for authentication.
import jwt from 'jsonwebtoken';

/**
 * This function recieves the name and the price of a subscription which will 
 * be inserted into the database if the provided token is valid. 
 * 
 * @param {name, price, token} req - The token of the user is provided in the 
 * header and the name and price of the subscription to be inserted.
 * @param {message} res - Loads the apropiated message depending on the token's
 * state or if the insertion has been carried out successfully.
 * 
 * @returns res
 */
export const addSubscription = async(req, res) => {
    const {name, price} = req.body;

    if(!name || !price)
        return res.status(400).json({message:"The name and price of the subscription are required!"});

    // Retrieves the user id from the token to be use in the database query. 
    var tokenContent = await getTokenId(req);

    Subscription.create({
        name: name
        ,price: price
        ,userId: tokenContent
    });

    return res.status(200).json({message:"Subscription for " + name + " added at a price of " + price + "€"})
}

/**
 * This function retrieves a user's subscriptions from the database after
 * validating the token provided in the header.
 * 
 * @param {token} req - The token is provided in the header. 
 * @param {subscriptions} res - a List of all subscriptions the user has.
 * 
 * @returns res
 */
export const getSubscriptions = async(req, res) => {
    // Extract the user's id from the provided token.
    let userId = await getTokenId(req)
    var subscriptions = await Subscription.findAll({
        where:
        {userId:userId}
    });

    return await res.status(200).json(subscriptions);
}

/**
 * This function modifies a subscription using the data provided in the body,
 *  whose id is provided trough the path, after checking the token.
 * 
 * @param {name, price, idSubscription} req - The modified name and the modified
 *  price of the subscription that needs to be modified, also the id is passed
 *  trough the path.
 * @param {message} res - An error message or a succeess message depending on
 *  the case.
 * 
 * @returns res 
 */
export const modifySubscription = async(req, res) => {
    var {name,price} = req.body;
    // Extracts the subscription id from the path.
    var idSubscription = req.path.split("/")[3];
    var subscription = await Subscription.findByPk(idSubscription)
    
// Check to see if the user making the update is the owner of the subscription.
    if(await getTokenId(req)==subscription.userId){    
        subscription.name = name
        subscription.price = price
        
        await subscription.save({fields:['name','price']})

        return res.status(200).json({message:"The subscription has been updated to!",
                                    miau:subscription.toJSON()});
    }else
        return res.status(403).json({message:"The subscription is nowhere to be found!"})


}

/**
 * This function deletes a subscription based on the id provided in the path.
 * 
 * @param {idSubscription} req - The id of the subscription, provided in the 
 * path, that the user wants to delete.
 * @param {message} res - An error message or a success message depending on the
 * success of the operation.
 * 
 * @returns res
 */
export const deleteSubscription = async (req, res) => {
    // Extracts the subscription id from the path.
    var idSubscription = req.path.split("/")[3];
    let subscription = await Subscription.findByPk(idSubscription);
     
    if(await getTokenId(req)==subscription.userId){
        await subscription.destroy({
                where:{
                    id : id
                }
        });
        return res.status(200).json({message:"The subscription has been deleted!"});
    
    }else
        return res.status(403).json({message:"The subscription is nowhere to be found!"});
}

/**
 * This method extracts the user's id from the token provided trough the header.
 * @param {header} req - The request provided by the user.
 * @returns userId
 */
async function getTokenId(req){
    // Extracts the "Authorization" header from the request if present, if not
    // replaces it with an empty string.
    const header = req.header("Authorization") || "";
    
    // Extracts the token.
    const token = header.split(" ")[1];
    var decodedToken = jwt.decode(token);

    return await decodedToken.userId;
}

// The default exports of the class.
export default{
    addSubscription
    ,getSubscriptions
    ,modifySubscription
    ,deleteSubscription
}