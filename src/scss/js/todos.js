// This is a copy from earlier version of notes.js

const notesApp = () => {

    const mainBoardList = document.querySelector('.main-board__list')
    const sidebarBoard = document.querySelector('.sidebar__select-details')
    const addButton = document.querySelector('.sidebar__add-button')

    const addNotesForm = () => {

        const notesForm = document.createElement('form')
        notesForm.classList.add('notes__form')
        notesForm.setAttribute("id", "notes-form")
        
        const notesInput = document.createElement('input')
        notesInput.classList.add('notes__input')
        notesInput.setAttribute("type", "text")
        notesInput.setAttribute("placeholder", "Here you can write notes...")

        notesForm.append(notesInput)
        sidebarBoard.append(notesForm)

        // Add attribute on the add button for addNotesForm
        addButton.setAttribute("type", "submit")
        addButton.setAttribute("form", "notes-form")

        notesForm.addEventListener('submit', submitNotes)

    }

    const submitNotes = (event) => {        

        event.preventDefault()

        const notes = event.target[0].value

        if ( !notes ) return

        showNotes(notes)

        event.target[0].value = ''

    }

    const showNotes = (notes) => {

        
        const notesEl = document.createElement('li')
        notesEl.classList.add('main-board__item', 'main-board__item--note')
        
        const notesContainer = document.createElement('div')
        notesContainer.classList.add('notes-container')
        notesContainer.innerText = notes

        notesEl.append(notesContainer)
        mainBoardList.append(notesEl)
    }
    
    addNotesForm()

}


export { notesApp }