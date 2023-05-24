const notesButton = document.querySelector('.sidebar__select-button--note')
const todoButton = document.querySelector('.sidebar__select-button--todo-list')
const quotesButton = document.querySelector('.sidebar__select-button--quote')
const addButton = document.querySelector('.sidebar__add-button')

const colorButtonOne = document.querySelector('.color-selection__color--1')
const colorButtonTwo = document.querySelector('.color-selection__color--2')
const colorButtonThree = document.querySelector('.color-selection__color--3')

const mainBoardList = document.querySelector('.main-board__list')
const sidebarBoard = document.querySelector('.sidebar__select-details')

const addNewItemApp = () => {

    notesButton.addEventListener('click', addNotesForm)
    todoButton.addEventListener('click', addTodoForm)
    quotesButton.addEventListener('click', getQuotes)

}

const addNotesForm = () => {

    // Remove an input field that was called earlier
    sidebarBoard.innerHTML = ''

    const notesForm = document.createElement('form')
    notesForm.classList.add('notes__form')
    notesForm.setAttribute("id", "notes-form")
    
    const notesInput = document.createElement('textarea')
    notesInput.classList.add('notes__input')
    notesInput.setAttribute('type', 'text')
    notesInput.setAttribute('id', 'notes-input')
    notesInput.setAttribute("placeholder", "Here you can write notes...")

    notesForm.append(notesInput)
    sidebarBoard.append(notesForm)

    // Remove class for current button
    const selectButtonArray = document.querySelectorAll('.sidebar__select-button')

    selectButtonArray.forEach(button => {
    
        if ( button.classList.contains('sidebar__select-button--current') )
        
        button.classList.remove('sidebar__select-button--current')
    
    })

    // Add class for current button
    notesButton.classList.add('sidebar__select-button--current')
    
}

const deleteItem = (event) => {
    const itemToBeDeleted = event.target.parentNode.parentNode.parentNode
    itemToBeDeleted.remove()
}

let allItemList = []

const addNotes = (notes, color) => {

    const notesItemObject = {
        id: Date.now(),
        content: notes,
        color: color,
        type: 'notes'
    }

    allItemList.push(notesItemObject)

    saveAllItemListInLocalStorage(allItemList)

}

const removeItem = (event) => {

    const itemId = parseInt(event.target.parentNode.parentNode.parentNode.dataset.id)

    if (!itemId) return

    const newAllItemList = allItemList.filter(item => item.id !== itemId)

    allItemList = newAllItemList

    saveAllItemListInLocalStorage(allItemList)

}


const renderAllItemList = (allItemList) => {
    
    if (!allItemList) return
    
    mainBoardList.innerHTML = ''
    
    
    
    allItemList.forEach(item => {
        
        if (item.type === 'notes') {
            
            const notesEl = document.createElement('li')
            const notesContainer = document.createElement('div')
            const buttonContainer = document.createElement('div')
            const deleteButton = document.createElement('button')
            
            notesEl.classList.add('main-board__item', 'main-board__item--note')
            notesEl.style.backgroundColor = item.color
            notesEl.dataset.id = item.id
            
            notesContainer.classList.add('main-board__content', 'main-board__content--notes')
            notesContainer.innerText = item.content
            
            // Create container for buttons at the bottom of each notes
            buttonContainer.classList.add('main-board__button-container')
            
            // Create Delete Button for Note List Element
            deleteButton.classList.add('main-board__delete-button')
            deleteButton.innerHTML = `
            <span class="material-symbols-outlined">
            delete
            </span>
            `
            
            buttonContainer.append(deleteButton)
            notesEl.append(notesContainer, buttonContainer)
            mainBoardList.append(notesEl)
            
            deleteButton.addEventListener('click', removeItem)
            
        } else if (item.type === 'quotes') {
            
            const quoteEl = document.createElement('li')
            const quoteContainer = document.createElement('div')
            const quoteToBeShown = document.createElement('div')
            const authorToBeShown = document.createElement('div')
            
            
            quoteEl.classList.add('main-board__item', 'main-board__item--quote')
            quoteEl.dataset.id = item.id
            
            quoteContainer.classList.add('main-board__content', 'main-board__content--quote')
            
            quoteToBeShown.classList.add('quote__content')
            quoteToBeShown.innerText = `"${item.content}"`
            
            authorToBeShown.classList.add('quote__author')
            authorToBeShown.innerText = item.author
            
            // Create container for buttons at the bottom of each notes 
            const buttonContainer = document.createElement('div')
            buttonContainer.classList.add('main-board__button-container')
            
            // Create Delete Button for Quote Element
            const deleteButton = document.createElement('button')
            deleteButton.classList.add('main-board__delete-button')
            deleteButton.innerHTML = `
            <span class="material-symbols-outlined">
            delete
            </span>
            `
            
            // Append elements
            quoteContainer.append(quoteToBeShown, authorToBeShown)
            buttonContainer.append(deleteButton)
            quoteEl.append(quoteContainer, buttonContainer)
            mainBoardList.append(quoteEl)
            
            deleteButton.addEventListener('click', removeItem)
            
        } else if (item.type === 'todo-list') {

            const addedItems = document.querySelectorAll('.main-board__item')
            const lastAddedItem = addedItems[addedItems.length - 1]


            const todoEl = document.createElement('li')
            const todoContainer = document.createElement('div')
            const todoList = document.createElement('ul')
            let todoItemArray = item.items
            
            
            todoEl.classList.add('main-board__item', 'main-board__item--todo')
            todoEl.dataset.id = item.id
            todoEl.innerHTML = ''
            
            todoContainer.classList.add('main-board__content', 'main-board__content--todo')
            
            todoList.classList.add('todo__list')
            
            
            todoItemArray.forEach(todo => {
                
                const todoItem = document.createElement('li')
                const todoCompleteButton = document.createElement('button')
                const todoContents = document.createElement('div')
                const todoDeleteButton = document.createElement('button')

                todoItem.classList.add('todo__item')
                todoItem.dataset.id = todo.id

                todoCompleteButton.classList.add('todo__complete')
                todoCompleteButton.innerHTML = `
                <span class="material-symbols-outlined">
                check_box_outline_blank
                </span>
                `
    
                todoContents.classList.add('todo__contents')
                todoContents.innerText = todo.task

                todoDeleteButton.classList.add('todo__delete')
                todoDeleteButton.innerHTML = `<span class="material-symbols-outlined">
                remove
                </span>`
                
                // Append Elements to Todo Item
                todoItem.append(todoCompleteButton, todoContents, todoDeleteButton)
                todoList.append(todoItem)
                
                // Add Event Listener
                // todoCompleteButton.addEventListener('click', toggleTodoComplete)
                // todoDeleteButton.addEventListener('click', deleteTodo)

            })

            
            const buttonContainer = document.createElement('div')
            const deleteButton = document.createElement('button')
            
            buttonContainer.classList.add('main-board__button-container')
            
            deleteButton.classList.add('main-board__delete-button')
            deleteButton.innerHTML = `
            <span class="material-symbols-outlined">
            delete
            </span>
            `
            
            todoContainer.append(todoList)
            buttonContainer.append(deleteButton)
            todoEl.append(todoContainer, buttonContainer)
            mainBoardList.append(todoEl)
            
            deleteButton.addEventListener('click', removeItem)
        }
    })
        
}


const saveAllItemListInLocalStorage = (list) => {
    
    if (!list) return
    
    const addedItems = document.querySelectorAll('.main-board__item')
    const lastAddedItem = addedItems[addedItems.length - 1]

    if (list === todos) {

        if (!lastAddedItem) {

            const todoListObject = {
                id: Date.now(),
                items: list,
                type: 'todo-list' 
            }

            allItemList.push(todoListObject)
    
        } else if ( lastAddedItem.classList.contains('main-board__item--todo') ) {
            
            allItemList.push(list) // ??
            
        
        } else {

            const todoListObject = {
                id: Date.now(),
                items: list,
                type: 'todo-list' 
            }
    
            allItemList.push(todoListObject)
    
        }


    }

    localStorage.setItem('allItemList', JSON.stringify(allItemList))

    renderAllItemList(allItemList)

}

const getAllItemListFromLocalStorage = () => {

    const storedLists = localStorage.getItem('allItemList')
    
    if (!storedLists) return

    allItemList = JSON.parse(storedLists)

    renderAllItemList(allItemList)

}

getAllItemListFromLocalStorage()

const submitNotes = (selectedColor) => {
    
    const color = selectedColor
    const notes = document.getElementById('notes-input').value

    if ( !notes ) return
    
    addNotes(notes, color)
    
    document.getElementById('notes-input').value = ''
    
}


// Todo App

const addTodoForm = () => {
    // Remove an input field that was called earlier
    sidebarBoard.innerHTML = ''
    
    const todoForm = document.createElement('form')
    todoForm.classList.add('todo__form')
    todoForm.setAttribute("id", "todo-form")
    
    const todoInput = document.createElement('input')
    todoInput.classList.add('todo__input')
    todoInput.setAttribute("type", "text")
    todoInput.setAttribute("placeholder", "Here you can write a todo...")

    todoForm.append(todoInput)
    sidebarBoard.append(todoForm)

    // Add attribute on the add button for addTodoForm
    addButton.setAttribute("type", "submit")
    addButton.setAttribute("form", "todo-form")

    todoForm.addEventListener('submit', submitTodo)

    // Remove class for current button
    const selectButtonArray = document.querySelectorAll('.sidebar__select-button')

    selectButtonArray.forEach(button => {

        if ( button.classList.contains('sidebar__select-button--current') )
        
            button.classList.remove('sidebar__select-button--current')

    })

    // Add class for current button
    todoButton.classList.add('sidebar__select-button--current')

}

let todos = []

const submitTodo = (event) => {        

    event.preventDefault()

    if ( !event ) return

    const inputValue = event.target[0].value

    addTodo(inputValue)

    event.target[0].value = ''

}

const addTodo = (inputValue) => {

    // Create Todo Item Object
    const todoItemObject = {
        id: Date.now(),
        task: inputValue,
        complete: false,
        type: 'todo'
    }

    todos.push(todoItemObject)

    saveAllItemListInLocalStorage(todos)

}

const addTodoItemToList = (allTodoLists) => {

    const todoList = document.querySelector('.todo__list')

    // Create Todo Item
    const todoItem = document.createElement('li')
    todoItem.classList.add('todo__item')

    // Create Complete Button
    const todoCompleteButton = document.createElement('button')
    todoCompleteButton.classList.add('todo__complete')
    todoCompleteButton.innerHTML = `
    <span class="material-symbols-outlined">
    check_box_outline_blank
    </span>
    `
    todoCompleteButton.addEventListener('click', toggleTodoComplete)

    // Create div and add user input for todo
    const todoContents = document.createElement('div')
    todoContents.classList.add('todo__contents')
    todoContents.innerText = todoInput

    // Create individual Delete Button for todo items
    const todoDeleteButton = document.createElement('button')
    todoDeleteButton.classList.add('todo__delete')
    todoDeleteButton.innerHTML = `<span class="material-symbols-outlined">
    remove
    </span>`
    todoDeleteButton.addEventListener('click', deleteTodo)
    
    // Append Elements to Todo Item
    todoItem.append(todoCompleteButton, todoContents, todoDeleteButton)

    // Append Todo Item to Todo List
    todoList.append(todoItem)
}


// const toggleTodoComplete = (event) => {

//     const todoToBeCompleted = event.target.parentNode.parentNode.querySelector('.todo__contents')

//     if ( event.target.innerText === 'check_box_outline_blank') {

//         event.target.innerText = 'check_box'

//         todoToBeCompleted.classList.add('todo__contents--completed')
    
//     } else {
    
//         event.target.innerText = 'check_box_outline_blank'
        
//         todoToBeCompleted.classList.remove('todo__contents--completed')


//     }
// }

// const deleteTodo = (event) => {

//     const todoToBeDeleted = event.target.parentNode.parentNode
//     todoToBeDeleted.remove()

// }



// Color Selection

let selectedColor = ''

const selectColor = (event) => {

    const selectedColorEl = event.target
    const colorButtonArray = document.querySelectorAll('.color-selection__color')

    colorButtonArray.forEach(button => {
        
        if ( button.classList.contains('color-selection__color--selected') )
        
        button.classList.remove('color-selection__color--selected')
        
    })

    selectedColorEl.classList.add('color-selection__color--selected')
    
    selectedColor = window.getComputedStyle(event.target).getPropertyValue('background-color')

    if ( notesButton.classList.contains('sidebar__select-button--current')) {

        addButton.addEventListener('click', () => {submitNotes(selectedColor)})
    
    }

}

colorButtonOne.addEventListener('click', selectColor)
colorButtonTwo.addEventListener('click', selectColor)
colorButtonThree.addEventListener('click', selectColor)

// Quotes

const API_URL = 'https://api.quotable.io/quotes/random?maxLength=80'

const getQuotes = async () => {
    
    const response = await fetch(API_URL)
    const data = await response.json()
    
    addQuotes(data)

    // Remove an input field that was called earlier
    sidebarBoard.innerHTML = ''

    // Remove class for current button
    const selectButtonArray = document.querySelectorAll('.sidebar__select-button')

    selectButtonArray.forEach(button => {

        if ( button.classList.contains('sidebar__select-button--current') )
        
            button.classList.remove('sidebar__select-button--current')

    })

    // Add class for current button
    quotesButton.classList.add('sidebar__select-button--current')

}
   
const addQuotes = (data) => {

    if (!data) return

    const quote = data[0].content
    const author = data[0].author

    const quoteItemObject = {
        id: Date.now(),
        content: quote,
        author: author,
        type: 'quotes'
    }
 
    allItemList.push(quoteItemObject)

    saveAllItemListInLocalStorage(allItemList)

}

addNewItemApp()


