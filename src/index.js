const theatreId = 1012;
const showingsDiv = document.querySelector(".ui.cards.showings")


fetch(`https://evening-plateau-54365.herokuapp.com/theatres/1012`)
  .then(r => r.json())
  .then(theater => {
    theater.showings.forEach(showing => {
      // console.log(showing)
      parseShowingsCard(showing)
    });
  })
  .catch(err => console.log(err))

function parseShowingsCard(showing) {

  let capacity = showing.capacity
  let ticketsSold = showing.tickets_sold
  let ticketsRemaining = capacity - ticketsSold

  let cardDiv = document.createElement('div')
    cardDiv.className = 'card'
    
    let contentDiv = document.createElement('div')
      contentDiv.className = 'content'

      let headerDiv = document.createElement('div')
        headerDiv.className = 'header'
        headerDiv.innerText = showing.film.title

      let metaDiv = document.createElement('div')
        metaDiv.className = 'meta'
        metaDiv.innerText = `${showing.film.runtime} minutes`

      let descriptionDiv = document.createElement('div')
        descriptionDiv.className = 'description'
        descriptionDiv.innerText = `${ticketsRemaining} remaining tickets`
        
      let showtimeSpan = document.createElement('span')
        showtimeSpan.className = 'ui label'
        showtimeSpan.innerText = showing.showtime

    contentDiv.append(headerDiv, metaDiv, descriptionDiv, showtimeSpan)

    let extraContentDiv = document.createElement('div')
      extraContentDiv.className = 'extra content'

      let buyTicketDiv = document.createElement('div')
        buyTicketDiv.classList.add('ui', 'blue', 'button')
        buyTicketDiv.innerText = 'Buy Ticket'
    
    
    if (ticketsRemaining > 0) {
      extraContentDiv.append(buyTicketDiv)
    } else {
      extraContentDiv.innerText = 'Sold Out'
    }

  cardDiv.append(contentDiv, extraContentDiv)

  showingsDiv.append(cardDiv)

  // call function to buy ticket. pass in buyTicketDiv and showing
  buyTicket(showing, buyTicketDiv, descriptionDiv, ticketsRemaining, extraContentDiv)
}

function buyTicket(showing, buyTicketDiv, descriptionDiv, ticketsRemaining, extraContentDiv) {
  // console.log(showing, buyTicketDiv)

  buyTicketDiv.addEventListener('click', (e) => {
    // console.log(showing.id, buyTicketDiv)

    if (ticketsRemaining > 1) {

      fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
        method:'POST',
        headers: { 
          'content-type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          'showing_id': showing.id
        })
      })
        .then(r => r.json())
        .then(json_resp => {
          console.log(json_resp, descriptionDiv)
          ticketsRemaining = ticketsRemaining - 1
          descriptionDiv.innerText = `${ticketsRemaining} remaining tickets`
        })
        .catch(err => console.log(err))

    } else {

      fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
        method:'POST',
        headers: { 
          'content-type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          'showing_id': showing.id
        })
      })
        .then(r => r.json())
        .then(json_resp => {
          // console.log(json_resp, descriptionDiv)
          ticketsRemaining = ticketsRemaining - 1
          descriptionDiv.innerText = `${ticketsRemaining} remaining tickets`
          buyTicketDiv.remove()
          extraContentDiv.innerText = 'Sold Out'
          surpise(showing)
        })
        .catch(err => console.log(err))

    }



  })

}



// As a user, when the page loads I should see a list of movie showings fetched from a remote API.

// * As a user, clicking on the 'Buy Ticket' button should purchase a ticket and decrement the remaining tickets by one. This information should be persisted in the remote API.

// * As a user I should not be able to purchase a ticket for a sold out showing. The 'Buy Ticket' button should be disabled on sold out showings, and the text should change to "sold out".

// A theatre has many showings.

// The number of tickets remaining for a showing can be determined by subtracting the current `tickets_sold` from the total `capacity` of the showing.






















function surpise(showing) {
  alert(`Sorry Eric, ${showing.film.title} is sold out!`)
}