const theatreId = 1022;
let showingsDiv = document.querySelectorAll('.ui')[2]

fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
.then(r => r.json())
.then((movies) => {
    
   // console.log(movies)
   
    let movieShowings = movies.showings
    
    movieShowings.forEach(showing => {
        let movieShowCard = document.createElement('div')
        movieShowCard.id = showing.id 
        movieShowCard.className = 'card'

        movieShowCard.innerHTML = `<div class="card">
        <div class="content">
        <div class="header">
        ${showing.film.title}
        </div>
        <div class="meta">
        ${showing.film.runtime} minutes
        </div>
        <div class="description">
        ${showing.tickets_sold} 
        </div>
        <span class="ui label">
        ${showing.showtime}
        </span>
        </div>
        <div class="extra content">
        <div id="${showing.id}" class="ui blue button">Buy Ticket</div>
        </div>
        </div>` 

        showingsDiv.append(movieShowCard)

        movieShowCard.addEventListener('click', (evt) => {
            
            let showCard = evt.target.parentElement.parentElement
            let showDescription = showCard.querySelector('.description')
            
            showDescription.innerText - 1
            console.log(showCard)
        })
        
        fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
            method:'POST',
            headers: { 
             'Content-type': 'application/json',
             'Accept': 'application/json'
         },
         body: JSON.stringify({
             
             showing_id: showing.id
            })
        })
        .then(r => r.json())
        .then((res) => {
            res
            console.log(res)
        })
        
        
        
        
    })
})
        //debugger
                // fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`, {
                //   method:'PATCH',
                //  headers: { 
                //      'Content-type': 'application/json'
                //  },
                //  body: JSON.stringify({
                //         tickets_sold:  showDescription.innerText - 1
                //   })
                // })
                // .then(r => r.json())
                // .then((res) => {
                //     console.log(res)
                // })
    
                //debugger 


    






//debugger 



// movieCardDiv.append(movContentDiv, filmTitleDiv, runTimeDiv, numTicketsDiv, showTimeSpan,)
// extraContentDiv.append(buyTicketDiv)
// showingsDiv.append(movieCardDiv, extraContentDiv)

/* <div class="card">
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
</div> */



// {id: 1022, name: "Flatiron Theatres #1022", showings: Array(12)}
// id: 1022
// name: "Flatiron Theatres #1022"
// showings: Array(12)
// 0:
// capacity: 20
// film: {title: "Death Be Not Proud", runtime: 87}
// id: 9647
// showtime: "09:21AM"
// tickets_sold: 8
// __proto__: Object



// let movieCardDiv = document.createElement('div')
// movieCardDiv.className = 'card'
// let movContentDiv = document.createElement('div')
// movContentDiv.className = 'content'
// let filmTitleDiv = document.createElement('div')
// filmTitleDiv.className = 'header'
// filmTitleDiv.innerText = movie.title
// let runTimeDiv = document.createElement('div')
// runTimeDiv.className = 'meta'
// runTimeDiv.innerText = movie.runtime
// let numTicketsDiv = document.createElement('div')
// numTicketsDiv.className = 'description'
// numTicketsDiv.innerText = movie.tickets_sold 
// let showTimeSpan = document.createElement('span')
// showTimeSpan.className = 'ui label'
// showTimeSpan.innerText = movie.showtime 

// let extraContentDiv = document.createElement('div')
// extraContentDiv.className = 'extra content'
// let buyTicketDiv = document.createElement('div')
// buyTicketDiv.className = 'ui blue button'

