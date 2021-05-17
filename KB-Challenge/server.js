// Author: Tyler Gavin
// Date: 5/17/2021
// KanBan Coding Challenge
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 23456;

app.options('*', cors());
app.use(cors());

import apiRoutes from './routes/api.js';

app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.get("/api/kanban", (req, res) => {
    console.log('[Test]!');
    
    res.send('Hello from kanban.');
});

app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
});
