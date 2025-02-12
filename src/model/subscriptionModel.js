import {Sequelize} from 'sequelize';
import db from '../config/database.js';

const {DataTypes} = Sequelize;

var Subscription = db.define('subscription', {
    id:{
        type : DataTypes.INTEGER
        ,autoIncrement : true
        ,allowNull : false
        ,primaryKey : true
    }
    ,name:{
        type : DataTypes.STRING
    }
    ,price:{
        type:DataTypes.DOUBLE
    }
}
,{
    timestamps : false
    ,freezeTableName : true
});



await db.sync();

export default Subscription;