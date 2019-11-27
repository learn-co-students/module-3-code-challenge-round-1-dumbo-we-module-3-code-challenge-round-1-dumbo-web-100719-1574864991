const theatreId = 1025;

document.addEventListener('DOMContentLoaded',() => {
console.log('page loaded')

fetchTheaters()
})

let fetchTheaters = () => {

    const url = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`
    fetch(url, {
    method:'GET',
    headers: { 
        'Content-type': 'application/json',
        'accept': 'application/json'
    }
    })
    .then(resp => resp.json())
    .then(json_resp => {
        // console.log(json_resp.showings)
        createTheaterList(json_resp.showings)
    })
    .catch((error) => {console.error(error);})


}

let createTheaterList = (theaterObj) => {
    theaterObj.forEach((indivTheater) => {
        renderTheaterCard(indivTheater)
    })
}

let renderTheaterCard = (theaterObj) => {

    // console.log(theaterObj.capacity- theaterObj.tickets_sold)
    let mainDiv = document.querySelector('.cards')
       
    let theaterCard = document.createElement('div')
    theaterCard.className = 'card'
    let cardContent= document.createElement('div')
    cardContent.className = 'content'
    let cardHeader= document.createElement('div')
    cardHeader.className = 'header'
    cardHeader.innerText = theaterObj.film.title
    let cardRunTime= document.createElement('div')
    cardRunTime.className = 'meta'
    cardRunTime.innerText = `${theaterObj.film.runtime} minutes`
    let cardDescription= document.createElement('div')
    cardDescription.className = 'description'
    cardDescription.dataset.id = theaterObj.id
    cardDescription.innerText = `${theaterObj.capacity- theaterObj.tickets_sold} remaining tickets`
    let cardSpan= document.createElement('span')
    cardSpan.className = 'ui label'
    cardSpan.innerText = theaterObj.showtime

    let cardExtraContent= document.createElement('div')
    cardExtraContent.className = 'extra content'
    cardExtraContent.dataset.extra = theaterObj.id
    cardExtraContent.innerText = ((theaterObj.capacity- theaterObj.tickets_sold)===0)? 'Sold Out':''
    let cardButton= document.createElement('div')
    cardButton.className = 'ui blue button'
    cardDescription.dataset.button = theaterObj.id
    cardButton.innerText = ((theaterObj.capacity- theaterObj.tickets_sold)===0)?'Sold Out':'Buy Ticket'
    cardButton.style.display = ((theaterObj.capacity- theaterObj.tickets_sold)===0)?'none':'block'
    cardButton.addEventListener('click', (event) => {
        buyTicket(theaterObj)
    })

   


    cardContent.append(cardHeader,cardRunTime,cardDescription,cardSpan)
    cardExtraContent.append(cardButton)
    theaterCard.append(cardContent,cardExtraContent)
    mainDiv.append(theaterCard)

}

let buyTicket = (theaterObj) => {
  
  let ticketRemainDiv = document.querySelector(`[data-id= '${theaterObj.id}'`)
  let button = document.querySelector(`[data-button= '${theaterObj.id}'`)
  let extra = document.querySelector(`[data-extra= '${theaterObj.id}'`)
  
  theaterObj.tickets_sold++

  let ticketCapacity = theaterObj.capacity
  let ticketSold = theaterObj.tickets_sold
  let ticketRemain = ticketCapacity - ticketSold
    
  
    const url = `https://evening-plateau-54365.herokuapp.com/tickets`
    fetch(url, {
      method:'POST',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     },
     body: JSON.stringify({
        showing_id: theaterObj.id
      })
    })
    .then(resp => resp.json())
    .then(json_resp => {
        console.log('buy',json_resp)

        ticketRemainDiv.innerText = `${ticketRemain} remaining tickets`
         if (ticketRemain === 0){
            button.style.display = ''
            extra.innerText = 'Sold out'
        }
    })
    .catch((error) => {console.error(error);})
}

