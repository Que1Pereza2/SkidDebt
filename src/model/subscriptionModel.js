/**
 * This class defines the model for subscription and the database table 
 * asociated with this model.
 */

// Imports Sequelize so we can define the data types in the database accepts.
import {Sequelize} from 'sequelize';

// Imports db so we can connect to the database and define the model.
import db from '../config/database.js';

const {DataTypes} = Sequelize;

/**
 * The defined model for the table that will then be created in the database.
 */
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

// Saving the table in the database.
await db.sync();

export default Subscription;