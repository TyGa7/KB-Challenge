import express from 'express';

const router = express.Router();
const items = []

//all routes here begin with /api
router.get('/items', (req, res) => {
    res.send(items);
});

router.put('/items', (req, res) => {
    const item = req.body;

    items.push(item);

    res.send(`Item with ID ${item.id} added!`);
});

router.post('/items', (req, res) => {
    const itemID = req.body.id;
    const itemNewCol = req.body.column;

    const foundItem = items.find((item) => item.id == itemID);

    if (foundItem != null)
        foundItem.column = itemNewCol;

    res.send(foundItem);
});

export default router;