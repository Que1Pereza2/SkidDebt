import Subscription from '../model/subscriptionModel.js';
import jwt from 'jsonwebtoken';

// • POST /api/subscriptions → Create a new subscription (requires authentication).
export const addSubscription = async(req, res) => {
    const {name, price} = req.body;
//    console.log(name + price )


    if(!name || !price)
        return res.status(400).json({message:"The name and price of the subscription are required!"})

    var tokenContent = await getTokenId(req)
    // console.log(tokenContent)

    Subscription.create({
        name: name
        ,price: price
        ,userId: tokenContent
    })

    return res.status(200).json({message:"Subscription for " + name + " added at a price of " + price + "€"})
}

// • GET /api/subscriptions → Show all subscriptions (requires authentication).
export const getSubscriptions = async(req, res) => {
    
    let userId = await getTokenId(req)
    var subscriptions = await Subscription.findAll({
        where:
        {userId:userId}
    });
    // return res.status(200).json({message:"Subscription for " + name + " added at a price of " + price + "€"})
    return await res.status(200).json(subscriptions);
    // return res.status(200);
}

// • PUT /api/subscriptions/:id → Modify an existing subscription (requires authentication).
export const modifySubscription = async(req, res) => {
    var {name,price} = req.body;
    var id = req.path.split("/")[3];
    
    // console.log(id);
    // console.log(name);
    // console.log(price);
    
    // Subscription.update()
    var subscription = await Subscription.findByPk(id)
    if(await getTokenId(req)==subscription.userId){
        
        subscription.name = name
        subscription.price = price
        
        await subscription.save({fields:['name','price']})

        return res.status(200).json({message:"The subscription has been updated to!",
                                    miau:subscription.toJSON()});
    }else
        return res.status(403).json({message:"The subscription is nowhere to be found!"})


}

// • DELETE /api/subscriptions/:id → Eliminate a subscription (requires authentication).
export const deleteSubscription = async (req, res) => {
    var id = req.path.split("/")[3];

    let subscription = await Subscription.findByPk(id);
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

async function getTokenId(req){
    const header = req.header("Authorization") || "";
    // console.log(header)
    const token = header.split(" ")[1];
    var decodedToken = jwt.decode(token);
    return await decodedToken.userId;

}

export default{
    addSubscription
    ,getSubscriptions
    ,modifySubscription
    ,deleteSubscription
}