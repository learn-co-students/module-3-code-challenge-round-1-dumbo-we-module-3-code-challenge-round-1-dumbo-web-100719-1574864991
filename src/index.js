

const theatreId = 1013;
const showingsDiv = document.querySelector(".cards")
const theaterUrl = "https://evening-plateau-54365.herokuapp.com/theatres/1013"
let postUrl = `https://evening-plateau-54365.herokuapp.com/tickets`


let getAllTheaters = () => {
    fetch(theaterUrl)
    .then(resp => resp.json())
    .then(TheaterObj => {
        TheaterObj.showings.forEach(showing => {
            CreateAndAppendShowingDiv(showing)
        });

    })
    
}

let CreateAndAppendShowingDiv = (showing) => {
    let showingDiv = document.createElement("div")
    showingDiv.className = "card"
    showingDiv.innerHTML = ` <div class="content">
    <div class="header">
      ${showing.film.title}
    </div>
    <div class="meta">
      ${showing.film.runtime} minutes
    </div>
    <div class="description">
      ${showing.capacity - showing.tickets_sold} remaining tickets
    </div>
    <span class="ui label">
      ${showing.showtime}
    </span>
  </div>
  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>
    `
    let buyButton = showingDiv.querySelector(".blue")
    let buyButtonContainer = showingDiv.querySelector(".extra")
    buyButton.style.display = (showing.capacity - showing.tickets_sold<= 0 ? "none" : "")
    let description = showingDiv.querySelector(".description")
    description.innerText = (showing.capacity - showing.tickets_sold<= 0 ? "" : `${showing.capacity - showing.tickets_sold} remaining tickets`)

    let soldOutButton = document.createElement("div")
    soldOutButton.className = "ui red button"
    soldOutButton.innerText= "Sold Out"
    soldOutButton.style.display = (showing.capacity - showing.tickets_sold<= 0 ? "" : "none")
    soldOutButton.addEventListener(`click`, (event) => {
        alert("Sorry, this show is sold out. Please try one of our other wonderful films.")
    })
    buyButtonContainer.append(soldOutButton)



    buyButton.addEventListener(`click`, (event) => {
        showing.tickets_sold+=1
        fetch(postUrl, {
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
        .then(json_resp => {
            description.innerText = (showing.capacity - showing.tickets_sold<= 0 ? "" : `${showing.capacity - showing.tickets_sold} remaining tickets`)
            buyButton.style.display = (showing.capacity - showing.tickets_sold<= 0 ? "none" : "")
            soldOutButton.style.display = (showing.capacity - showing.tickets_sold<= 0 ? "" : "none")
        })
    })
    showingsDiv.append(showingDiv)
}

getAllTheaters()