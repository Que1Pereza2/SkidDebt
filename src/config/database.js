import {Sequelize} from 'sequelize';

const DB_USER = ''
const DB_PASSWORD = ''
const DB_HOST = ''
const DB_DIALECT = ''
const DB_DATABASE = ''

const server = new Sequelize('', DB_USER, DB_PASSWORD, {
    host : DB_HOST
    ,dialect : DB_DIALECT
});

await server.query(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\`;`);

server.close();

const db = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD,{
    host: DB_HOST
   ,dialect: DB_DIALECT
});

export default db;