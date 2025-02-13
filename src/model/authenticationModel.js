/**
 * This class defines the model for User and the database table asociated with
 *  this model.
 */

// Imports Sequelize so we can define the data types in the database accepts.
import {Sequelize} from 'sequelize';

// Imports db so we can connect to the database and define the model.
import db from '../config/database.js';

const {DataTypes} = Sequelize;

/**
 * The defined model for the table that will then be created in the database.
 */
var User = db.define('user', {
    id:{
        type: DataTypes.INTEGER
        ,autoIncrement : true
        ,allowNull : false
        ,primaryKey : true
    }
    ,username:{
        type : DataTypes.STRING
    }
    ,hashedPassword:{
        type:DataTypes.STRING
    }
},{
    timestamps: false
    ,freezeTableName: true
});

// Saving the table in the database.
await db.sync();

export default User;