const theatreId = 1028;
let movieShowDiv = document.getElementsByClassName("ui cards showings")
let attach = movieShowDiv.item(0)
// console.log(movieShowDiv)

fetch(`https://evening-plateau-54365.herokuapp.com/theatres/1028`)
.then(resp => resp.json())
.then((theaterArray) => {
  
     theaterArray.showings.forEach(showing => {
       addShowingToPage(showing)
     });
  
    })

function addShowingToPage(showing){

    let cardDiv = document.createElement("div")
    cardDiv.className = "card"

    let contentDiv = document.createElement("div")
    contentDiv.className = "content"

    let headerDiv = document.createElement("div")
    headerDiv.className = "header"
    headerDiv.innerText = showing.film.title

    let metaDiv = document.createElement("div")
    metaDiv.className = "meta"
    metaDiv.innerText = `${showing.film.runtime} minutes`

    let descDiv = document.createElement("div")
    descDiv.className = "description"
    let remainingTickets = (showing.capacity) - (showing.tickets_sold)
    // console.log(showing.capacity)
    descDiv.innerText = `${remainingTickets} remaining tickets`

    let showtimeSpan = document.createElement("span")
    showtimeSpan.className = "ui label"
    showtimeSpan.innerText = showing.showtime

    let extraContentDiv = document.createElement("div")
    extraContentDiv.className = "extra content"

    let ticketsButton = document.createElement("div")
    ticketsButton.className = "ui blue button"
    ticketsButton.innerText = "Buy Tickets"

    
    cardDiv.append(contentDiv, headerDiv, metaDiv, descDiv, showtimeSpan, extraContentDiv, ticketsButton)
    // console.log(movieShowDiv);
    attach.append(cardDiv, extraContentDiv) 
    
    ticketsButton.addEventListener("click", () => {
        // console.log(showing.id)
       fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
         method:'POST',
         headers: { 
            'Content-type': 'application/json',
            'accept': 'application/json'
         },
         body: JSON.stringify({
            showing_id: showing.id
         })
       })
       .then(resp => resp.json())
       .then((showing) => {
        let newTicketAmount = showing.tickets_sold - 1
        descDiv.innerText = `${(showing.capacity) - (showing.tickets_sold)} remaining tickets`
        // console.log(new)
       })
        
    })
}



{/* <div class="card">
  <div class="content">
    <div class="header">
      (Film Title)
    </div>
    <div class="meta">
      (Runtime) minutes
    </div>
    <div class="description">
      (Num Tickets) remaining tickets
    </div>
    <span class="ui label">
      (Showtime)
    </span>
  </div>

  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>
</div> */}