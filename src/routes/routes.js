import express from 'express';
import subscriptionController from '../controller/subscriptionController.js'
import authenticationController from '../controller/authenticationController.js'

const router = express.Router();


// • POST /api/auth/register → signing up a new user.
router.post('/api/auth/register',(req, res) => authenticationController.AddUser(req,res));

// • POST /api/auth/login → Logging in a user and generating the JWT token.
router.post('/api/auth/login',(req, res) => authenticationController.LoginUser(req,res));


// • POST /api/subscriptions → Create a new subscription (requires authentication).
router.post('/api/subscriptions', authenticationController.verifyToken, (req, res) => subscriptionController.addSubscription(req,res));

// • GET /api/subscriptions → Show all subscriptions (requires authentication).
router.get('/api/subscriptions', authenticationController.verifyToken, (req, res) => subscriptionController.getSubscriptions(req,res));

// • PUT /api/subscriptions/:id → Modify an existing subscription (requires authentication).
router.put('/api/subscriptions/:id', authenticationController.verifyToken, (req, res) => subscriptionController.modifySubscription(req,res));

// • DELETE /api/subscriptions/:id → Eliminate a subscription (requires authentication).
router.delete('/api/subscriptions/:id', authenticationController.verifyToken, (req, res) => subscriptionController.deleteSubscription(req,res));

export default router;