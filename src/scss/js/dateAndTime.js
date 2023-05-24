const getDateAndTime = () => {

  const dateContainer = document.querySelector('.widget__content--date')
  const timeContainer = document.querySelector('.widget__content--time')
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const now = new Date()

  let minutes = now.getMinutes().toString()
  let hours = now.getHours().toString()
  let date = now.getDate()
  let month = monthNames[now.getMonth()]
  let year = now.getFullYear()

  if (minutes.length < 2) {
  
    minutes = '0' + minutes
  
  }
  
  if (hours.length < 2) {
  
    hours = '0' + hours
  
  }

  dateContainer.innerText = `${month} ${date}, ${year}`
  timeContainer.innerText = `${hours}:${minutes}`

  setTimeout(getDateAndTime, 1000)

}

getDateAndTime()
