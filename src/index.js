const theatreId = 1017

fetch(`https://evening-plateau-54365.herokuapp.com/theatres/1017`)
.then(resp => resp.json())
.then(theatreObj => theatreObj.showings.forEach(showing => {
    renderShowings(showing)
})
);

// const mainShowingDiv = document.getElementsByClassName("ui cards showings")
const mainShowingDiv = document.querySelector(".showings")


function renderShowings(showing) {

    let oneDiv = document.createElement("div")
 
console.log(showing)
   
let remainingTickets = showing.capacity - showing.tickets_sold 
console.log(remainingTickets)

    oneDiv.innerHTML = 
`
          <div class="content">
            <div class="header">
            ${showing.film.title}
            </div>
            <div class="meta">
            ${showing.film.runtime}
            </div>
            <div class="description">
            ${remainingTickets} 
            </div>
            <span class="ui label">
            ${showing.showtime}
            </span>
          </div>
        `
        let buyTicketButton = document.createElement("button")
        buyTicketButton.innerText = "Buy Ticket"

        let remainingTicketsDiv = oneDiv.querySelector(".description")
        console.log(remainingTicketsDiv)

     mainShowingDiv.append(oneDiv)
     oneDiv.append(buyTicketButton)
   

  buyTicketButton.addEventListener("click", (evt) => {
    //   console.log("click working")
     createTicket(showing, remainingTickets, remainingTicketsDiv)
  })
    }



    function createTicket(showing, remainingTickets, remainingTicketsDiv) {
    
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
          .then(updatedShowing => {
            //   console.log("fetch hitting")
            //   console.log(updatedShowing)
            //   console.log(showing.id)
          remainingTickets = remainingTickets - 1
          remainingTicketsDiv.innerText = remainingTickets

        //   if remainingTickets == 0
        //   then return "That showing is sold out" 
          
        })

    }

