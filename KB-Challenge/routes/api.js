// Author: Tyler Gavin
// Date: 5/17/2021
// KanBan Coding Challenge
import express from 'express';
import nconf from 'nconf';
import fs from 'fs';

const router = express.Router();
var items = []


//load from json config file
nconf.file({ file : 'config.json' });

const Shift = nconf.get('config:Shift');
const Loads = nconf.get('config:Loads');

console.log(`Shift: ${Shift}, Loads: ${Loads}`);


//checks if state file exists -
//if so, loads state from file and decrypts
//if not, creates state file and stores current state

//decrypt and load current state into memory
if (fs.existsSync(Loads)) {
    fs.readFile('state.txt', 'utf8', function (err, data) {
        console.log("State file exists. Reading.");

        var decryptedString = shiftCipher(data, Shift*(-1));
        items = JSON.parse(decryptedString);
    });
}
//create and store current state of kanban
else {
    updateState(items);
}

//all routes here begin with /api

//gets current state of kanban board
router.get('/kanban', (req, res) => {
    res.send(items);
});

//adds item to backlog column
router.put('/kanban', (req, res) => {
    const item = req.body;

    items.push(item);

    updateState(items);

    res.send(`Item with ID ${item.id} added!`);
});

//updates column of item
router.post('/kanban', (req, res) => {
    const itemID = req.body.id;
    const itemNewCol = req.body.column;

    const foundItem = items.find((item) => item.id == itemID);

    if (foundItem != null)
        foundItem.column = itemNewCol;

    updateState(items);

    res.send(foundItem);
});


//function to perform cipher shift on strings
function shiftCipher (string, shiftVal) {
    //decrypt
    if (shiftVal < 0) {
        return shiftCipher(string, shiftVal + 94);
    }

    var result = "";

    //loop through each string character
    for (var i = 0; i < string.length; i++) {
        var char = string[i];
        var code = string.charCodeAt(i);

        char = String.fromCharCode(((code - 32 + shiftVal) % 94) + 32);

        result += char;
    }

    return result;
};


function updateState (itemsToWrite) {
    var kanbanString = JSON.stringify(itemsToWrite);

    //shift cipher on string
    var shiftedString = shiftCipher(kanbanString, Shift);

    fs.writeFile('state.txt', shiftedString, function () {
        console.log("State file updated.");
    });
    return;
};

export default router;