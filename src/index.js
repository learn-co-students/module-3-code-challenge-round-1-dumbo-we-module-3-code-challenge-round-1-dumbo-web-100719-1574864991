const theatreId = 1010;

const allMovieShowings = document.querySelector(".ui-cards-showings")
const buyMovieTickets = document.querySelector(".sub-header")
const showingId = document.querySelector("h2")

fetch(`https://evening-plateau-54365.herokuapp.com/theatres/1010`)
.then(resp => resp.json())
.then((obj) => {
    obj.showings.forEach(function (movie){
        listEachMovies(movie);
    }

)})

function listEachMovies(movie){
    let singleMovie = document.createElement("div")
        singleMovie.innerText = movie.film.title
        singleMovie.classList = ("card", "header", "content")
    let movieRuntime = document.createElement("div")
        movieRuntime.innerText = movie.film.runtime
        movieRuntime.className = "meta"
    let movieTimes = document.createElement("span")
        movieTimes.innerText = movie.showtime
        movieTimes.className = "ui label"
    let buyButton = document.createElement("div")
        buyButton.className = "extra Content"
        buyButton.classList = ("extra content", "ui blue button")
        buyButton.innerText = "Buy Ticket"


    allMovieShowings.append(singleMovie, movieRuntime, movieTimes, buyButton)

    function movieTicketsRemaining(movieCapacity){
        let movieTotalCapacity = document.createElement("div")
            movieTotalCapacity.innerText = movie.capacity
        let movieTicketsSold = document.createElement("div")
            movieTicketsSold.innerText = movie.tickets_sold
        movieTotalCapacity -= parseInt(movieTicketsSold)
    }

    buyButton.addEventListener(`click`, (evt) => {


        let moviePurchase = evt.target.film
        debugger

        fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
          method:'POST',
         headers: { 
             'Content-type': 'application/json',
             'accept': 'application/json'
         },
         body: JSON.stringify({
                showing_id: evt.target.showingId
          })
        })
        .then(resp => resp.json())
        .then(resp => 
            
        appendTicketOrderToDom(resp) )
        
    })

    function appendTicketOrderToDom(){}
}
