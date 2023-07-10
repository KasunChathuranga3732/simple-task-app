import express from "express";
import dotenv from 'dotenv';
import mysql, {Pool} from "promise-mysql";

export const router = express.Router();

let pool:Pool;
dotenv.config();

// IIFE - Immediately Invoked Function Expression
(async ()=>{
    pool =  await mysql.createPool({
        host: process.env.host,
        port: +process.env.port!,
        database: process.env.database,
        user: process.env.username,
        password: process.env.password,
        connectionLimit: +process.env.connection_limit!,
    });
})();