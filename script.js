function createNewItem(item) {
    const li = document.createElement('li');
    li.className = 'list-item';
    const text = document.createTextNode(item);
    
    const button = createButton('icon btn');

    li.appendChild(text);

    li.appendChild(button);

    document.querySelector('.item-list').appendChild(li);
}

function createButton(classes) {
    const btn = document.createElement('button');
    btn.className = classes;

    const icon = createIcon('icon icon--red', "close-outline")
    btn.appendChild(icon);

    return btn;
}

function createIcon(classes, attributes) {
    const icon = document.createElement('ion-icon');
    icon.className =  classes; 
    icon.setAttribute('name', attributes);

    return icon;
}

createNewItem('Cheese');
createNewItem('Fruits');
createNewItem('Fruits');