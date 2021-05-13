const columns = document.querySelectorAll('.column');
const btn_add = document.querySelector("#add-button");
const first_col = document.getElementById("first-column");
const middle_col = document.getElementById("middle-column");
const last_col = document.getElementById("last-column");

//add button event listener
btn_add.addEventListener('click', function (e) {
    btn_add.disabled = true;
    console.log('click', e);

    //create new div and place in first column
    const newDiv = document.createElement("div");
    newDiv.classList.add('new-item');
    first_col.appendChild(newDiv);

    //add text input to new div
    const newInput = document.createElement("textarea");
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

        //add right arrow button to new item
        const newRA = document.createElement("div");
        newRA.classList.add('item-right-arrow');
        newItem.appendChild(newRA);
        newRA.innerHTML = ">";

        //add left arrow button to new item
        const newLA = document.createElement("div");
        newLA.classList.add('item-left-arrow');
        newItem.appendChild(newLA);
        newLA.innerHTML = "<";

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

//listen for user to click in first column
first_col.addEventListener('click', function (e) {
    var cname = e.target.className;
    if (cname != "item-right-arrow")
        return console.log(e)
    console.log(e.target.parentElement);
    middle_col.appendChild(e.target.parentElement);
});


//listen for user to click middle column
middle_col.addEventListener('click', function (e) {
    var cname = e.target.className;
    console.log(cname);
    if ((cname != "item-right-arrow") && (cname != "item-left-arrow"))
        return console.log("neither")
    
    if (cname == "item-right-arrow")
        last_col.appendChild(e.target.parentElement)
    if (cname == "item-left-arrow")
        first_col.appendChild(e.target.parentElement)
    
    AnchorBtn();
});

//list for user to click last column
last_col.addEventListener('click', function (e) {
    var cname = e.target.className;
    if (cname != "item-left-arrow")
        return console.log(e)
    console.log(e.target.parentElement);
    middle_col.appendChild(e.target.parentElement);
});

//function to anchor button at bottom of column
function AnchorBtn() {
    var btn = document.getElementById('add-button');
    var parent = btn.parentNode;
    parent.insertBefore(parent.lastChild, btn);
}

