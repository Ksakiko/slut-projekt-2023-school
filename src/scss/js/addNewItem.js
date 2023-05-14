import { notesApp } from '../js/notes.js'

const addNewItemApp = () => {


    const notesButton = document.querySelector('.sidebar__select-button--note')

    notesButton.addEventListener('click', notesApp)

}

addNewItemApp()