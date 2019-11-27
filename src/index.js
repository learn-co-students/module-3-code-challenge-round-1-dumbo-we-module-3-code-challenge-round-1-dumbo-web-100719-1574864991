const theatreId = 1026;

let showingDiv = document.querySelector('div.showings')
fetch(`https://evening-plateau-54365.herokuapp.com/theatres/1026`)
.then(r => r.json())
.then(response => {
    response.showings.forEach((showingObj) => {
        makeShowingsIntoDiv(showingObj)
    })
    
})

function makeShowingsIntoDiv(showingObj){
    let ticketsRemaining = showingObj.capacity - showingObj.tickets_sold

    let cardDiv = document.createElement('div')
    cardDiv.className = 'card'
    cardDiv.innerHTML = `<div class="content">
    <div class="header">
      ${showingObj.film.title}
    </div>
    <div class="meta">
      ${showingObj.film.runtime} minutes
    </div>
    <div class="description">
      ${ticketsRemaining} remaining tickets
    </div>
    <span class="ui label">
      ${showingObj.showtime}
    </span>
  </div>`
    let extraContentDiv = document.createElement('div')
    extraContentDiv.classList = "extra content"
    extraContentDiv.innerHTML = `<div class="ui blue button">Buy Ticket</div>`

    cardDiv.append(extraContentDiv)
    showingDiv.append(cardDiv)

    let button = extraContentDiv.querySelector('.button')

    
    button.addEventListener('click', (event) => {

        // extraContentDiv.querySelector('.button').disabled = true

        // if (showingObj.tickets_sold <= showingObj.capacity) {
        //     return;
        // }
        
        showingObj.tickets_sold += 1

        fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
          method:'POST',
         headers: { 
             'Content-type': 'application/json',
             'accept': 'application/json'
         },
         body: JSON.stringify({
        showing_id: showingObj.id
          })
        })
        .then(r => r.json())
        .then(new_ticket => {
            showingObj.tickets_sold
            let ticketDiv = cardDiv.querySelector('.description')
            ticketDiv.innerText = `${showingObj.capacity - showingObj.tickets_sold} remaining Tickets`

            // if (showingObj.tickets_sold <= showingObj.capacity) {
            //     button.style.display = "hidden";
            // }
        })
    })

        if (showingObj.tickets_sold <= showingObj.capacity) {
            // button.style.display = "block";//none here but its applying to every button because there is an instance where i have 0 tickets remaing already
            // let soldOut = document.createElement('li')
            // soldOut.innerText = "SOLD OUT"
            // button.disabled = true;

        }


}

