const theatreId = 1019;

fetch(`https://evening-plateau-54365.herokuapp.com/theatres/1019`)
  .then(r => r.json())
  .then(ticketsObjArray => {
      let ticketsArray = ticketsObjArray.showings
      ticketsArray.forEach(ticket => {
          ticketBlueprint(ticket)
      });
  })

let ticketContainer = document.querySelector(".showings")
let ticketBlueprint = (ticket) => {
    let ticketsRemaining = (ticket.capacity) - (ticket.tickets_sold)
    let ticketDivCard = document.createElement("div")
    ticketDivCard.className = "card"
    let ticketDivContent = document.createElement("div")
    ticketDivContent.className = "content"
    let ticketDivHeader = document.createElement("div")
    ticketDivHeader.className = "header"
    ticketDivHeader.innerText = ticket.film.title
    let ticketDivMeta = document.createElement("div")
    ticketDivMeta.className = "meta"
    ticketDivMeta.innerText = `${ticket.film.runtime} minutes`
    let ticketDivDescription = document.createElement("div")
    ticketDivDescription.className = "description"
    ticketDivDescription.innerText = `Tickets Remaining: ${ticketsRemaining}`
    let ticketSpan = document.createElement("span")
    ticketSpan.className = "ui label"
    ticketSpan.innerText = ticket.showtime 
    let extraDiv = document.createElement("div")
    extraDiv.className = "extra content"
    let anotherDiv = document.createElement("div")
    anotherDiv.className = "ui blue button"
    anotherDiv.innerText = "Buy Ticket"
    buyTicketFunctionality(anotherDiv, ticket, ticketsRemaining)
    extraDiv.append(anotherDiv)
    ticketDivContent.append(ticketDivHeader, ticketDivMeta, ticketDivDescription, ticketSpan)
    ticketDivCard.append(ticketDivContent, extraDiv)
    ticketContainer.append(ticketDivCard)
}

let buyTicketFunctionality = (anotherDiv, ticket, ticketsRemaining) => {
    ticketsRemaining = ticketsRemaining - 1 
    anotherDiv.addEventListener("click", () => {
        fetch(`https://evening-plateau-54365.herokuapp.com/theatres/1019/${ticket.id}`, {
            method:'PATCH',
            headers: { 
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
            tickets_sold: ticket.capacity - ticketsRemaining
            })
        })
        .then(r => r.json())
        .then(json_resp => {
            ticketDivDescription.innerText = `Tickets Remaining: ${ticketsRemaining}`
            anotherDiv.innerText = ticketsRemaining <= 0 ? "Sold Out" : "Buy Ticket"
        })
    })
}


