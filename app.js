//Feature 1: Add new todo
//Capture buttons and ul elements
const newTodo = document.querySelector('#new-todo');
const todos = document.querySelector('#list');
const hiddenTitle = document.querySelector('.hidden');
const deleteTodo = document.querySelectorAll('.delete-todo');
const isEmpty = () => {
    if (todos.children.length === 0){
        hiddenTitle.classList.remove('hidden');
    }
    
    else {
        hiddenTitle.classList.add('hidden');
    }
}

newTodo.addEventListener('click', (e) => {
    //Add attributes to elements
    //Create form, input, li elements;
    const form = document.createElement('form');
    const input = document.createElement('input');
    const newLi = document.createElement('li');
    const textSpan = document.createElement('span');
    const span = document.createElement('span');
    const row = document.createElement('div');
    const liCol = document.createElement('div');
    const btnCol = document.createElement('div');
    const deleteBtn = document.createElement('button');
    //Define svg source attribute
    const svgNs = 'http://www.w3.org/2000/svg';
    //Create svg and rect elements;
    const svg = document.createElementNS(svgNs, 'svg');
    const rect = document.createElementNS(svgNs, 'rect');

    svg.setAttributeNS(null, 'viewBox', "0 0 100 100");
    rect.setAttributeNS(null, 'width', '100');
    rect.setAttributeNS(null, 'height', '100');
    input.setAttribute('type', 'text');
    input.setAttribute('maxlength', '40');
    input.setAttribute('required', true)
    deleteBtn.innerText = "Delete";

    //Add classes to elements
    svg.classList.add('square');
    input.classList.add('input-text');
    textSpan.classList.add('todo');
    newLi.classList.add('todos');
    row.classList.add('row','d-flex','justify-content-between');
    liCol.classList.add('col-9');
    btnCol.classList.add('col-3','d-flex','align-items-center','justify-content-start');
    deleteBtn.classList.add('btn','btn-lg','btn-danger','delete-todo');

    //Append elements to parents
    svg.appendChild(rect);
    span.appendChild(svg);
    form.appendChild(input);
    textSpan.appendChild(form);
    newLi.append(span, textSpan);
    liCol.appendChild(newLi);
    btnCol.appendChild(deleteBtn);
    row.append(liCol, btnCol)
    todos.appendChild(row);
    input.focus();

    isEmpty()

    //Create function for submit todo
    const addTodo = (e) => {
        e.preventDefault()
        let text = input.value;
        if (text !== ''){
            textSpan.innerText = text
            newLi.removeEventListener('submit', addTodo, false);
        }
    }

    //Listen for form submission to prevent default and add todo to ul;
    newLi.addEventListener('submit', addTodo, false);
})

//Feature 2: Mark todo as complete
todos.addEventListener('click', function(e){
    let check = e.target;
    if (check.nodeName === "svg"){
        // todo.classList.toggle('done');
        check.firstChild.classList.toggle('check');
        check.parentNode.parentNode.classList.toggle('done');
    }
    else if (check.nodeName === "rect"){
        check.classList.toggle('check');
        check.parentNode.parentNode.parentNode.classList.toggle('done');
    }
})

//Feature 3: Edit todo
//Define edition function
const editTodo = function (e){
    if (e.target.className === "todo"){
        //Create a input on target
        let todo = e.target;
        let editForm = document.createElement('form');
        let input = document.createElement('input');
        //Add class to input
        input.classList.add('input-text');
        input.setAttribute('type', 'text');
        editForm.classList.add('editing')
        //Copy span text content to new variable
        let todoText = todo.innerText;
        //Set input value to previously copied content
        input.value = todoText;
        //Append input to editForm
        editForm.appendChild(input);
        //Remove span's previous text
        todo.innerText = '';
        //Append editForm to span
        todo.appendChild(editForm);
        //Listen to form submission
        input.focus()
        todo.addEventListener('submit', (e) => {
            e.preventDefault()
            if (input.value === '') {
                todo.innerText = todoText;
            }
            else {
                todo.innerText = input.value;
            }
        })
    }
}

todos.addEventListener('click', editTodo, false)


//Feature 4: Remove a todo
const removeTodo = (e) => {
    let button = e.target;
    if (button.nodeName === 'BUTTON') {
        let row = button.parentElement.parentElement;
        todos.removeChild(row);
        isEmpty();
    }
}

// todos.addEventListener('mouseover', (e) => {
//     console.log(e.target)
// })

// todos.addEventListener('mouseout', (e) => {
//     if (e.target.className === 'todos'){
//         console.log(e.target)
//         e.target.querySelector('button').classList.remove('show-button')
//     }
// })

todos.addEventListener('click', removeTodo, false)

//Feature 5: Remove all todos