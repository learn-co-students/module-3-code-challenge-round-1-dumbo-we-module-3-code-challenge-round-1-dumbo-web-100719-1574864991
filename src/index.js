// Global Variable Declarations
const theatreId = 1021;
const parentDiv = document.querySelector('.showings')


//  Get Request
const getTheatres = async() =>{
  const theatreFetch = await fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
  const resp = await theatreFetch.json() 
  // resp is an object
  resp.showings.forEach(showing => {
    renderCardShowings(showing)
  });
  
}

// Invocation for get request
getTheatres()

// Rendering Cards
const renderCardShowings = showingObj =>{

  let cardDiv = document.createElement('div')
  cardDiv.className = 'card'
  let contentDiv = document.createElement('div')
  contentDiv.className = 'content'

  let headerDiv = document.createElement('div')
  headerDiv.className = 'header'
  headerDiv.innerText = showingObj.film.title
  // console.log(headerDiv)

  let metaDiv = document.createElement('div')
  metaDiv.className = 'meta'
  metaDiv.innerText = showingObj.film.runtime + ' minutes'
  

  let descDiv = document.createElement('div')
  descDiv.className = 'description'
  descDiv.textContent = showingObj.capacity - showingObj.tickets_sold 

  let span = document.createElement('span')
  span.className = 'ui'
  span.classList.add('label')
  span.innerText = showingObj.showtime

  contentDiv.append(headerDiv, metaDiv, descDiv, span)
  let extraDiv = document.createElement('div')
  extraDiv.className = 'extra'
  extraDiv.classList.add('content')

  let buttonDiv = document.createElement('div')
  buttonDiv.className = 'ui'
  buttonDiv.classList.add('blue', 'button')
  buttonDiv.innerText = 'Buy Ticket'
  buttonDiv.dataset.id = showingObj.id
  buttonDiv.id = descDiv.innerText
  
  extraDiv.append(buttonDiv)

  cardDiv.append(contentDiv,extraDiv )
  
  parentDiv.append(cardDiv)

  buyShowingTicket(buttonDiv,descDiv)

}


// Post Request
const buyShowingTicket = (button,descDiv) =>{
  if (button.id <= 0) {
    buttonDisabler(button)

  }else{
  button.addEventListener('click', (e)=>{
      e.preventDefault()
      fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        'body': JSON.stringify({
          showing_id: e.target.dataset.id
        })

      })
        .then(res => res.json())
        .then(data => {
          if(descDiv.innerText < 1){
            buttonDisabler(button)
          }else{
            descDiv.innerText--
          }
          
        

        })
      
  
  
    })
  }
}


const buttonDisabler = button =>{
  button.innerText = 'Sold Out'
  button.disabled = true
  button.style.opacity = '0.2'
}
