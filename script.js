const form = document.querySelector('.form');
const formBtn = form.querySelector('.primary-btn');
const itemInput = document.querySelector('.item-input');
const itemList = document.querySelector('.item-list');
const filterItems = document.querySelector('.filter-items');
const clearBtn = document.querySelector('.clear');

let isEditMode = false;

// Fetches items from local storage and display it
function displayItems() {
    const savedItems = getItemsFromStorage();

    savedItems.forEach(item => {
        addItemToDom(item);
        checkUI();
    });
}


function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    if(isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeFromLocalStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit.mode');
        itemToEdit.remove()

        isEditMode = false;
    } else {
        if(checkItemExist(newItem)) {
            alert('Item already exits');
            itemInput.value = '';
            return;

        }
    }

    if (newItem === '' || newItem === ' ') {
        alert('Please Add An Item');
        return;
    }

    addItemToDom(newItem);

    addItemsToStorage(newItem);

    checkUI();

    itemInput.value = '';
}

function addItemToDom(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    li.className = 'list-item';

    const btn = createButton('icon btn remove-item');

    li.appendChild(btn);

    itemList.appendChild(li); // This is where an items is added to the DOM
}

function addItemsToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(item) {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    } 

    return itemsFromStorage;
}

function createIcon(classes, attr) {
    const icon = document.createElement('ion-icon');
    icon.className = classes;
    icon.setAttribute("name", attr);


    return icon;
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;

    const icon = createIcon('icon icon--red', 'close-outline');

    button.appendChild(icon);

    return button;
}

function onListClick(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)
    } else {
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item) {
    isEditMode = true;

    itemList.querySelectorAll('.list-item').forEach(i => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');

    formBtn.innerHTML = '<ion-icon name="pencil-outline" class="icon"></ion-icon> Update Item';
    formBtn.style.backgroundColor = '#228b22';

    itemInput.value = item.textContent;
}

function removeItem(item) {
    if (confirm(`Are you sure you want to remove "${item.innerText}"?`)) {
        // Remove item from DOm
        item.remove();

        // Remove from localStorage
        removeFromLocalStorage(item.textContent);

        checkUI();
    }
}

function removeFromLocalStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage = itemsFromStorage.filter(i => i !== item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems(e) {
    if (confirm(`Are you sure you want to remove all the items?`)) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }

        // Clear items from LocalStorage
        localStorage.removeItem('items');
    }

    checkUI()
}


function filter(e) {
    const items = itemList.querySelectorAll('li');
    const filterText = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemText = item.firstChild.textContent.toLocaleLowerCase();

        if (itemText.indexOf(filterText) !== -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })
}


function checkItemExist(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

function checkUI() {
    itemInput.value = '';
    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        filterItems.style.display = 'none';

    } else {
        clearBtn.style.display = 'block';
        filterItems.style.display = 'block';
    }

    formBtn.innerHTML = '<ion-icon name="add-outline" class="icon"></ion-icon> <span>Add Item</span>';
    formBtn.style.backgroundColor = '#495057';


    isEditMode = false;
}

// Event Listeners
function init() {
    form.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onListClick);
    clearBtn.addEventListener('click', clearItems);
    filterItems.addEventListener('input', filter);
    document.addEventListener('DOMContentLoaded', displayItems);
    
    checkUI();
}

init();











// localStorage.setItem('name', 'Brad');
// console.log(localStorage.getItem('name'));
// // localStorage.removeItem('name');
// localStorage.clear();