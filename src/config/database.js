import {Sequelize} from 'sequelize';

const DB_USER = 'root'
const DB_PASSWORD = 'Cred1Ca2Mor3'
const DB_HOST = '192.168.139.156'
const DB_DIALECT = 'mysql'
const DB_DATABASE = 'SkidDebt'

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