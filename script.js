const form = document.querySelector('.form');
const itemInput = document.querySelector('.item-input');
const itemList = document.querySelector('.item-list');
const filterItems = document.querySelector('.filter-items');
const clearBtn = document.querySelector('.clear');

function addItem (e) {
    e.preventDefault();

    const newItem = itemInput.value;

    if ( newItem === '' || newItem === ' ') {
        alert('Please Add An Item');
        return;
    }

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    li.className = 'list-item';

    const btn = createButton('icon btn remove-item');

    li.appendChild(btn);

    itemList.appendChild(li); // This is where an items is added to the DOM

    checkUI();

    itemInput.value = '';
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

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if(confirm(`Are you sure you want to remove ${e.target.parentElement.parentElement.innerText}?`)) {
            e.target.parentElement.parentElement.remove();

            checkUI();
        }
    }
}

function clearItems(e) {
    if(confirm(`Are you sure you want to remove all the items?`)) {
        while(itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    }

    checkUI()
}


function filter(e) {
    const items = itemList.querySelectorAll('li');
    const filterText = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemText = item.firstChild.textContent.toLocaleLowerCase();

        if(itemText.indexOf(filterText) !== -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })
}

function checkUI() {
    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        filterItems.style.display = 'none';

    } else {
        clearBtn.style.display = 'block';
        filterItems.style.display = 'block';
    }
}

// Event Listeners
form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
filterItems.addEventListener('input', filter)

checkUI();