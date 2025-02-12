import express from 'express';
import morgan from 'morgan';
import User from './model/authenticationModel.js';
import Subscription from './model/subscriptionModel.js';
import router from './routes/routes.js';
import db from './config/database.js';

const app = express();
const port = 3000;


app.set('port', process.env.PORT || 300);
app.set('json spaces',2);

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.use(router);

User.hasMany(Subscription,{ as: 'subscriptions'});
Subscription.belongsTo(User, {
    as: "user"
    ,foreignKey:"userId"
});

db.sync({alter:true})

app.listen(port, () => {
  console.log(`Server listen on http://localhost:${port}`);
});
