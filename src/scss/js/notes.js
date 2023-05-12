// TODO remove enter submit for notes app. Add enter function in input field

const notesApp = () => {

    const mainBoardList = document.querySelector('.main-board__list')
    const sidebarBoard = document.querySelector('.sidebar__select-details')
    const addButton = document.querySelector('.sidebar__add-button')

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

        addButton.addEventListener('click', submitNotes)
    }
    
    const submitNotes = () => {        
        
        const notes = document.getElementById('notes-input').value
              
        if ( !notes ) return

        showNotes(notes)

        document.getElementById('notes-input').value = ''

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