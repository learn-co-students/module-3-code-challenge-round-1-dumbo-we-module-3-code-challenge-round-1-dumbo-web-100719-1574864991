const theatreId = 1011;

const newLocal = document.querySelector(".showings");
document.addEventListener(`DOMContentLoaded`, () => {

    let cardsShowings = newLocal
   
    let cardContent = document.createElement("div")
    cardContent.className = "content"
    let url = `https://evening-plateau-54365.herokuapp.com/theatres/1011`
    fetch(url)
    .then(resp => resp.json())
    .then(showingsArr => showingsArr.showings.forEach(showing=> {
        getOneShowing(showing)

       
    }))


    
    
    function getOneShowing(showing){
        // debugger
        let showCard = document.createElement("div")
        showCard.className = "card"
        let header = document.createElement("div")
        header.className = "header"
        header.innerText =  showing.film.title
        let runtime = document.createElement("div")
        runtime.className = "meta"
        runtime.innertext = showing.film.runtime
        let ticketsSold = document.createElement("div")
        ticketsSold.className = "description"
        ticketsSold.innerHTML = `${showing.tickets_sold} remaining tickets`
        let showtime = document.createElement("span")
        showtime.className = "label"
        showtime.innerHTML = showing.showtime
        let extraContent = document.createElement("div")
        extraContent.className = "extra"
        let blueButton = document.createElement("button")
        blueButton.className = ("blue")
        blueButton.className = ("button")
        blueButton.className = ("ui")
        blueButton.innerHTML = "Buy Ticket"
        extraContent.append(blueButton)
        showCard.append(header, runtime, ticketsSold, showtime, extraContent)
        cardsShowings.append(showCard)
        blueButton.addEventListener(`click`, (evt) => {
            console.log("button","pushed")
            
            id = showing.id
            fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
             method:'POST',
             headers: { 
                 'Content-type': 'application/json',
                 'accept': 'application/json'
             },
             body: JSON.stringify({
                showing_id: id
              })
            })
            .then(resp => resp.json())
            .then(ticketsClick)
            .catch((err))
            
        })
        function ticketsClick(){
            if(parseInt(ticketsSold.innerHTML) != showing.capacity)
                ticketsSold.innerHTML = `${--showing.tickets_sold } remaining tickets`
            else if(parseInt(ticketsSold.innerHTML) = showing.capacity)
                tickets_sold.innerHTML = "error: That showing is sold out"
                // debugger
        }

            // debugger
}
})