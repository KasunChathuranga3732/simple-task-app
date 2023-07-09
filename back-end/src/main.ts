import express from 'express';
import {router} from "./api/task-controller";

const app = express();

app.use("/app/api/v1/tasks", router);
app.listen(8080, () => console.log("Server has been started at 8080"));