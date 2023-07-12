import express, {json} from "express";
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


type Task = {
    id: number,
    description: string,
    status: 'COMPLETED' | 'NOT_COMPLETED' | undefined
}

/* Get all tasks */
router.get("/", async (req, res)=>{
    const tasks = await pool.query("SELECT *  FROM task");
    res.json(tasks);
});


/* Create a new task */
router.post("/", async (req, res)=>{
    const task = (req.body as Task);
    if(!task.description?.trim()) {
        res.sendStatus(400);
        return;
    }

    const result = await pool.query("INSERT INTO task (description, status) VALUES (?, DEFAULT)",
        [task.description]);

    task.id = result.insertId;
    task.status = "NOT_COMPLETED";

    res.status(201).json(task);
});


/* Delete an existing task*/
router.delete("/:taskId", async (req, res)=>{
    const result = await pool.query("DELETE FROM task WHERE id=?",
        [req.params.taskId]);
    res.sendStatus(result.affectedRows ? 204 : 404);
});


/* Update an existing task*/
router.patch("/:taskId", async (req, res)=>{
    const task = (req.body as Task);
    task.id = +req.params.taskId;
    if(!task.status){
        res.sendStatus(400);
        return
    }
    const result = await pool.query("UPDATE task set status=? WHERE id=?",
        [task.status, req.params.taskId]);
    res.sendStatus(result.affectedRows ? 204 : 404);
});
