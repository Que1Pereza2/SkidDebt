import {Sequelize} from 'sequelize';
import db from '../config/database.js';

const {DataTypes} = Sequelize;

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

await db.sync();

export default User;