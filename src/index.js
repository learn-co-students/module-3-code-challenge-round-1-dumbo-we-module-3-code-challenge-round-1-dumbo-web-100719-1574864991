const theatreId = 1016;
let moviesCardDiv = document.querySelector('.ui.cards.showings')
// .catch((error));
// console.error(error)

fetch('https://evening-plateau-54365.herokuapp.com/theatres/1016')
    .then(r => r.json())
        .then((updMovies) => {
            // console.log(updMovies['showings'])
            updMovies['showings'].forEach((movie) => {
                // console.log(movie['capacity'])
                buildMovie(movie)
                
            })
        })
        





    function buildMovie(movie){
    
    let movieName = document.createElement('div')
    movieName.innerText = movie['film']['title']
    // console.log(movieName)
    movieName.className = "header"

    
    let movieRuntime = document.createElement('div')
    movieRuntime.innerText = movie['film']['runtime']
    movieRuntime.className = "meta"
    
    let movieDesc = document.createElement('div')
    movieDesc.innerText = movie['capacity'] - movie['tickets_sold']
    movieDesc.className = "description"
    
    let movieShowtime = document.createElement('span')
    movieShowtime.className = "ui label"
    movieShowtime.innerText = movie['showtime'] 
    
    let movieButton = document.createElement('button')
    movieButton.innerText = "Buy Ticket"
    movieButton.className = "ui blue button"

    let extContentDiv = document.createElement('div')
    extContentDiv.className = "extra content"
    
    
    
    moviesCardDiv.append(movieName)
    moviesCardDiv.append(movieDesc)
    moviesCardDiv.append(movieRuntime)
    moviesCardDiv.append(movieShowtime)
    extContentDiv.append(movieButton)
    moviesCardDiv.append(extContentDiv)
    
    movieButton.addEventListener('click', () => {
        fetch('https://evening-plateau-54365.herokuapp.com/tickets/', {
            method: "POST",
            headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:{
            showing_id: movie['id']
        }
    })
      .then (resp => resp.json())
        .then ((newResp) => {
            console.log(newResp)
            buyTicket(newResp)
        })  
      
    })
    
    
}

function buyTicket(movie){
    if (movie['capacity'] <= 0 ) {
        movieButton.innerText = "Sold Out"
    }
}


