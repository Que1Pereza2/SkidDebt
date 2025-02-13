// Imports express so we can use the framework to create a web app.
import express from 'express';
// Imports morgan so we can log the HTTP requests.
import morgan from 'morgan';
// Imports the data base connection so we can sync the database after defining 
// the foreign keys.
import db from './config/database.js';
// Imports router so we can link the request to the desired endpoint.
import router from './routes/routes.js';
// Imports User and Subscription so we can define their foreign keys.
import User from './model/authenticationModel.js';
import Subscription from './model/subscriptionModel.js';

const app = express();
const port = 3000;

// Configuration for the port and JSON settings.
app.set('port', process.env.PORT || 300);
app.set('json spaces',2);

// Middleware settings.
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json())

// Using router to manage requests.
app.use(router);

// Define the relationship between the tables.
User.hasMany(Subscription,{ as: 'subscriptions'});
Subscription.belongsTo(User, {
    as: "user"
    ,foreignKey:"userId"
});

// Saving the previously created relationship between User and Subscription.
db.sync({alter:true})

// Launching the application.
app.listen(port, () => {
  console.log(`Server listen on http://localhost:${port}`);
});
