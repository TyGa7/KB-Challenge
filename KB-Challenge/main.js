const column_items = document.querySelectorAll('.column-item');
const columns = document.querySelectorAll('.column');
const btn_add = document.querySelector("#add-button");
const first_col = document.getElementById("first-column");

let draggedItem = null;

//item event listener
for (let i = 0; i < column_items.length; i++) {
    const item = column_items[i];

    //listen for drag start
    item.addEventListener('dragstart', function (e) {
        console.log('dragstart', e);
        draggedItem = item;
        setTimeout(function () {
            item.style.display = 'none';
        }, 0);
    });
    
    //listen for drag end
    item.addEventListener('dragend', function () {
        console.log('dragend');
        setTimeout(function () {
            draggedItem.style.display = 'block';
            draggedItem = null;
        }, 0);
    });

    //listen for item click@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // item.addEventListener('click', function (e){

    // });

    //column event listener
    for (let j = 0; j < columns.length; j++) {
        const column = columns[j];
        
        //listen for drag over
        column.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        //listen for drag enter
        column.addEventListener('dragenter', function (e) {
            e.preventDefault();
        });

        //listen for drop
        column.addEventListener('drop', function (e) {
            this.append(draggedItem);
            
            AnchorBtn();
        });
    }
}

//add button event listener
btn_add.addEventListener('click', function (e) {
    btn_add.disabled = true;
    console.log('click', e);

    //create new div and place in first column
    const newDiv = document.createElement("div");
    newDiv.classList.add('new-item');
    first_col.appendChild(newDiv);

    //add text input to new div
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.classList.add('new-input');
    newDiv.appendChild(newInput);

    //add "Creating..." text
    const newText = document.createElement("div");
    newText.classList.add('new-text');
    newDiv.appendChild(newText);
    const textContent = document.createTextNode("Creating...");
    newText.appendChild(textContent);

    //add "Done" button
    const newBtn = document.createElement("BUTTON");
    newBtn.innerText = "Done";
    newBtn.classList.add('done-button');
    newDiv.appendChild(newBtn);

    //listen for user to click done button
    newBtn.addEventListener('click', function (createItem) {
        //get text value and remove div
        const inputText = newInput.value;
        newDiv.parentElement.removeChild(newDiv);

        //add new item with entered text value
        const newItem = document.createElement("div");
        newItem.classList.add('column-item');
        first_col.appendChild(newItem);

        const newItemText = document.createElement("div");
        newItemText.classList.add('item-text');
        newItem.appendChild(newItemText);
        newItemText.innerHTML = inputText;

        //add date to new item
        const newItemDate = document.createElement("div");
        newItemDate.classList.add('item-date');
        newItem.appendChild(newItemDate);

        var d = new Date()
        var day = d.getUTCDate();
        var month = d.getUTCMonth()+1;
        var year = d.getUTCFullYear();
        var fullDate = month + "/" + day + "/" + year;

        const dateContent = document.createTextNode(fullDate);
        newItemDate.appendChild(dateContent);

        //add name to new item
        const newItemName = document.createElement("div");
        newItemName.classList.add('item-name');
        newItem.appendChild(newItemName);
        const nameContent = document.createTextNode("John Doe");
        newItemName.appendChild(nameContent);

        newItem.setAttribute('draggable', true);
        btn_add.disabled = false;
        AnchorBtn();
    });

    AnchorBtn();
});

//function to anchor button at bottom of column
function AnchorBtn() {
    var btn = document.getElementById('add-button');
    var parent = btn.parentNode;
    parent.insertBefore(parent.lastChild, btn);
}
