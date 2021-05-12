const column_items = document.querySelectorAll('.column-item');
const columns = document.querySelectorAll('.column');
const btn_add = document.querySelector("#add-button")

let draggedItem = null;

btn_add.addEventListener('click', function (e) {
    console.log('click', e);
});

for (let i = 0; i < column_items.length; i++) {
    const item = column_items[i];

    item.addEventListener('dragstart', function (e) {
        console.log('dragstart', e);
        draggedItem = item;
        setTimeout(function () {
            item.style.display = 'none';
        }, 0);
    });

    item.addEventListener('dragend', function () {
        console.log('dragend');
        setTimeout(function () {
            draggedItem.style.display = 'block';
            draggedItem = null;
        }, 0);
    });

    for (let j = 0; j < columns.length; j++) {
        const column = columns[j];
        
        column.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        column.addEventListener('dragenter', function (e) {
            e.preventDefault();
        });

        column.addEventListener('drop', function (e) {
            this.append(draggedItem);
            
            //make button last element in column
            var btn = document.getElementById('add-button');
            var parent = btn.parentNode;
            parent.insertBefore(parent.lastChild, btn);
        });
    }
}
