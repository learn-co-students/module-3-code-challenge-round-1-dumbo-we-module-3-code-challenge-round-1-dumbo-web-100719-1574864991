const theatreId = 1018;

const allShowingsDiv = document.querySelector(".showings")

fetch("https://evening-plateau-54365.herokuapp.com/theatres/1018")
.then(r => r.json())
.then((theatreObj) => {
    let showingsArr = theatreObj.showings
    showingsArr.forEach((showing) => {
        createShowingDiv(showing)
    })  
})

function createShowingDiv(showing){
    const showingDiv = document.createElement("div")
        showingDiv.className = "card"
    allShowingsDiv.append(showingDiv)
    let reamainingTime = showing.capacity - showing.tickets_sold

    showingDiv.innerHTML = `<div class="content">
    <div class="header">
      ${showing.film.title}
    </div>
    <div class="meta">
    ${showing.film.runtime} minutes
    </div>
    <div class="description" id ="remaining-tickets">
      ${reamainingTime} remaining tickets
    </div>
    <span class="ui label">
      ${showing.showtime}
    </span>
    </div>
    <div class="extra content">
        <div class="ui blue button" id="buy-button">Buy Ticket</div>
    </div>`
    
    let buyButton = showingDiv.querySelector("#buy-button")
    buyButton.addEventListener("click",(e) => {
        fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
      method:'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        showing_id: showing.id
      })
    })
    .then(resp => {
        if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("That showing is sold out" );
      }})
    .then((newTicketObj) => {
        console.log(newTicketObj.error)
        let rTime = showingDiv.querySelector("#remaining-tickets")
        if (reamainingTime > 0){
            rTime.innerText = `${reamainingTime - 1} remaining tickets`
        } else {
            return buyButton.parentElement.innerText = "Sold Out"
        }
    })
    .catch(err => console.log(err))
    })
}
