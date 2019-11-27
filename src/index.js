const theatreId = 1023;
let movieDiv = document.querySelector('.ui.cards.showings')

fetch(`https://evening-plateau-54365.herokuapp.com/theatres/1023`)
  .then(r => r.json())
  .then((moviesArr) => {
      moviesArr.showings.forEach(movie => {
          addMoviesToCards(movie)
        //   debugger
      });
  })
  .catch(err => console.log(err))

  function addMoviesToCards(movie){
    let cardDiv = document.createElement('div')
        cardDiv.className = 'card'
    cardDiv.innerHTML = `
    <div class="content">
    <div class="header">
      ${movie.film.title}
    </div>
    <div class="meta">
      ${movie.film.runtime} minutes
    </div>
    <div class="description">
      ${movie.capacity} remaining tickets
    </div>
    <span class="ui label">
      ${movie.showtime}
    </span>
  </div>
  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>
    `
    movieDiv.append(cardDiv)
        let ticketButton = cardDiv.querySelector('.ui.blue.button')
        let ticketCapacity = cardDiv.querySelector('.description')
        ticketButton.dataset.id = movie.id
        ticketButton.addEventListener('click', (event) => {
            // showingId = parseInt(event.target.dataset.id)
            // debugger

            // wrong address:-(
            fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
              method:'POST',
              headers: { 
                'content-type': 'application/json',
                'accept': 'application/json'
              },
              body: JSON.stringify({
              showing_id: parseInt(event.target.dataset.id),
              capacity: -- movie.capacity,
              tickets_sold: ++ movie.tickets_sold
              })
            })
              .then(r => r.json())
              .then((ticket) => {
            //   debugger
                // ticketCapacity.innerHTML = `${movie.capacity} remaining tickets`
                if(movie.capacity >1){
                    ticketCapacity.innerHTML = `${movie.capacity} remaining tickets`
                }
                else{
                    ticketCapacity.innerHTML = ticket.error
                    ticketButton.style.display = 'none'
                }

                
              })
              .catch(err => console.log(err))


        })
  }