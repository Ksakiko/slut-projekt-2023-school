const collapseToggleApp = () => {

    const sidebar = document.querySelector('.sidebar')
    const collapseButton = document.querySelector('.collapse-bar__button')
    const collapseButtonIcon = document.querySelector('.material-symbols-outlined')

    const collapseToggle = () => {
        
        sidebar.classList.toggle('sidebar--collapsed')

        if (collapseButtonIcon.innerText === 'arrow_right') {
            
            collapseButtonIcon.innerText = 'arrow_left'
        
        } else {
            collapseButtonIcon.innerText = 'arrow_right'
        }

    }

    collapseButton.addEventListener('click', collapseToggle)

}

collapseToggleApp()