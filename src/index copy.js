const theatreId = 1020;


// grab global elements from the DOM
let allPageDivs = document.querySelectorAll("div")

let allMoviesDiv = allPageDivs[4]
//document.querySelector("#movie_mainui_cards_showings")

// get movie showings data  from API using fetch

fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
.then(r => r.json())
.then((movieListingsResp) => {
    //console.log (movieListingsResp.showings[0].film.title)
    movieListingsResp.showings.forEach((movieObj) => {
        //console.log(movieObj)
        createMovieCard(movieObj)
        
    })
})

function createMovieCard(movieObj){
    let movieCardDiv = document.createElement("div")
        movieCardDiv.className = "card"
    let ticketsRemaining = movieObj.capacity - movieObj.tickets_sold

    //console.log(ticketsRemaining)
        movieCardDiv.innerHTML = `<div class="content">
        <div class="header">
          ${movieObj.film.title}
        </div>
        <div class="meta">
        ${movieObj.film.runtime} minutes
        </div>
        <div id = "tixs-left" class="description">
          ${ticketsRemaining} remaining tickets
        </div>
        <span class="ui label">
        ${movieObj.showtime}
        </span>
      </div>
      <div class="extra content"> 

        <div id = "buy-button" class="ui blue button">Buy Ticket</div>
      </div> `

      allMoviesDiv.append(movieCardDiv)


      // Allow users to buy a ticket
      let ticketsRemainingDiv = movieCardDiv.querySelector("#tixs-left")
      

      let buyTicketButton = movieCardDiv.querySelector("#buy-button")
      if (ticketsRemaining <= 0){

        buyTicketButton.style.display = "none"
    }

    else {

        buyTicketButton.style.display = ""
    }
      

      buyTicketButton.addEventListener("click", (evt) => {
          //console.log(`buy ticket for ${movieObj.film.title} of  ${ticketsRemaining} tickets`)
          //
          let showingId = movieObj.id
          //console.log(`tickets remaining is now ${ticketsRemaining}`)

          // submit a POST request to the API to create a new ticket

          createTicket(showingId)
          ticketsRemaining -= 1
          ticketsRemainingDiv.innerText = `${ticketsRemaining} remaining tickets`

          

        })

}

 // function to update tickets 

 function createTicket(showingId){

    fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
            method:'POST',
            headers: { 
               'Content-Type': 'application/json',
               'Accept': 'application/json'
           },
           body: JSON.stringify({
           showing_id: showingId
            })
          })
          .then(resp => resp.json())
          .then(createdTicket => {
              //console.log(createdTicket)
              //
              
         })

 }



