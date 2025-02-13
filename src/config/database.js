/**
 * This class defines and exports the database connection.
 */
// Imports for the database connection.
import {Sequelize} from 'sequelize';

// The user that will be used to connect to the database.
const DB_USER = 'DB_USER'

// The password used to connect to the database.
const DB_PASSWORD = 'DB_PASSWORD'

// The host of the database.
const DB_HOST = 'DB_HOST'

// The dialect of the database.
const DB_DIALECT = 'DB_DIALECT'

// The name of the database
const DB_DATABASE = 'DB_DATABASE'

/**
 * This method creates a new connection to the database using the user and the 
 * password provided above.
 */
const server = new Sequelize('', DB_USER, DB_PASSWORD, {
    host : DB_HOST
    ,dialect : DB_DIALECT
});

// Created the database if it doesn't exist.
await server.query(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\`;`);

// Close the database connection after the query is executed to avoid errors.
server.close();

/**
 * This method connects to the database created above and is the default export
 * of the class.
 */
const db = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD,{
    host: DB_HOST
   ,dialect: DB_DIALECT
});

export default db;