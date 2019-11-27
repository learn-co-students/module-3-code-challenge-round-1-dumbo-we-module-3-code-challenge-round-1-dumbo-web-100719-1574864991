const theatreId = 1008;

let showingCardArea = document.querySelector(".showings")

fetch("https://evening-plateau-54365.herokuapp.com/theatres/1008")
.then(r => r.json())
.then((theater) => {
    theater.showings.forEach((showing) => {
        createShowingCard(showing)
    })
})

function createShowingCard(showing){
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

    let descriptionDiv = document.createElement("div")
    descriptionDiv.className = "description"
    descriptionDiv.innerText = `${showing.capacity - showing[`tickets_sold`]} remaining tickets`

    let showingSpan = document.createElement("span")
    showingSpan.className = "ui label"
    showingSpan.innerText = showing.showtime

    let extraDiv = document.createElement("div")
    extraDiv.className = "extra content"

    let buyTicketDiv = document.createElement("div")
    if (showing[`tickets_sold`] === showing.capacity) {
        buyTicketDiv.innerText = "Sold Out"
    } else {
        buyTicketDiv.className = "ui blue button"
        buyTicketDiv.innerText = "Buy Ticket"
    }

    cardDiv.append(contentDiv, headerDiv, metaDiv, descriptionDiv, showingSpan, extraDiv, buyTicketDiv)
    showingCardArea.append(cardDiv)

    buyATicket(showing, buyTicketDiv, descriptionDiv)
}

function buyATicket(showing, buyTicketDiv, descriptionDiv){
    buyTicketDiv.addEventListener("click", (event) => {
        fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                showing_id: showing.id
            })
        })
        .then(r => r.json())
        .then((newTicket) => {
            ticketsLeft(showing, buyTicketDiv, descriptionDiv)
        })
    })
}

function ticketsLeft(showing, buyTicketDiv, descriptionDiv){
    if (showing[`tickets_sold`] === showing.capacity) {
        buyTicketDiv.innerText = "Sold Out"
        buyTicketDiv.className = ""
        buyTicketDiv.removeEventListener('click', buyATicket)
    } else {
        ++showing[`tickets_sold`]
        descriptionDiv.innerText = `${showing.capacity - showing[`tickets_sold`]} remaining tickets`
    }
}
