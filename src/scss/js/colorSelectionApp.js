

// const colorSelectionApp = () => {

//     const colorButtonOne = document.querySelector('.color-selection__color--1')
//     const colorButtonTwo = document.querySelector('.color-selection__color--2')
//     const colorButtonThree = document.querySelector('.color-selection__color--3')
    
//     const selectColor = (event) => {
    
//         const selectedColorEl = event.target
//         const colorButtonArray = document.querySelectorAll('.color-selection__color')
    
//         colorButtonArray.forEach(button => {
            
//             if ( button.classList.contains('color-selection__color--selected') )
                
//                 button.classList.remove('color-selection__color--selected')
    
//         })
    
//         selectedColorEl.classList.add('color-selection__color--selected')
        
//         const selectedColor = window.getComputedStyle(event.target).getPropertyValue('background-color')
    

//         // colorButtonOne.addEventListener('click', handleColor)
//         // colorButtonTwo.addEventListener('click', handleColor)
//         // colorButtonThree.addEventListener('click', handleColor)
    
//     }

//     // const handleColor = (selectedColor) => {
        
//     //     console.log(selectedColor)
    
//     //     // TODO Send color info to notes.js?
    
//     // }
    
//     colorButtonOne.addEventListener('click', selectColor)
//     colorButtonTwo.addEventListener('click', selectColor)
//     colorButtonThree.addEventListener('click', selectColor)

// }

// export { colorSelectionApp }