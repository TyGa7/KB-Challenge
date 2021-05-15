import express from 'express';
import bodyParser from 'body-parser';

import apiRoutes from './routes/api.js';

const app = express();
const port = 23456;

app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.get("/api/kanban", (req, res) => {
    console.log('[Test]!');
    
    res.send('Hello from kanban.');
});

app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
});