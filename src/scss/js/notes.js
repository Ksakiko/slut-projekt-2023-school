
// import { colorSelectionApp } from "../js/colorSelectionApp.js"

const notesApp = () => {

    const mainBoardList = document.querySelector('.main-board__list')
    const sidebarBoard = document.querySelector('.sidebar__select-details')
    const addButton = document.querySelector('.sidebar__add-button')

    // Remove an input field that was called earlier
    sidebarBoard.innerHTML = ''

    const addNotesForm = () => {

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
        
    }

    const colorSelectionApp = () => {

        const colorButtonOne = document.querySelector('.color-selection__color--1')
        const colorButtonTwo = document.querySelector('.color-selection__color--2')
        const colorButtonThree = document.querySelector('.color-selection__color--3')
        let selectedColor = ''

        const selectColor = (event) => {
        
            const selectedColorEl = event.target
            const colorButtonArray = document.querySelectorAll('.color-selection__color')
            selectedColor = window.getComputedStyle(event.target).getPropertyValue('background-color')
            
            colorButtonArray.forEach(button => {
                
                if ( button.classList.contains('color-selection__color--selected') )
                
                button.classList.remove('color-selection__color--selected')
                
            })
            
            selectedColorEl.classList.add('color-selection__color--selected')
            
            addButton.addEventListener('click', () => {submitNotes(selectedColor)})

        }
        
        colorButtonOne.addEventListener('click', selectColor)
        colorButtonTwo.addEventListener('click', selectColor)
        colorButtonThree.addEventListener('click', selectColor)
        
    }

    colorSelectionApp()
    
    const submitNotes = (selectedColor) => {
        
        const color = selectedColor
        const notes = document.getElementById('notes-input').value
        
        if ( !notes ) return
        
        showNotes(notes, color)
        
        document.getElementById('notes-input').value = ''
        
    }


    const showNotes = (notes, color) => {

        const notesEl = document.createElement('li')
        notesEl.classList.add('main-board__item', 'main-board__item--note')
        notesEl.style.backgroundColor = color

        const notesContainer = document.createElement('div')
        notesContainer.classList.add('main-board__content', 'main-board__content--notes')
        notesContainer.innerText = notes

        // Create Delete Button 
        const deleteButtonContainer = document.createElement('div')
        deleteButtonContainer.classList.add('main-board__delete-button')
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = `
        <span class="material-symbols-outlined">
        delete
        </span>
        `
        deleteButton.addEventListener('click', deleteNotes)
        deleteButtonContainer.append(deleteButton)

        
        notesEl.append(notesContainer, deleteButtonContainer)
        mainBoardList.append(notesEl)
        
    }

    const deleteNotes = (event) => {
        const notesToBeDeleted = event.target.parentNode.parentNode.parentNode
        notesToBeDeleted.remove()
    }
    
    addNotesForm()
}

export { notesApp }