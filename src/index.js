const theatreId = 1007;


let theatreCard = document.querySelectorAll('.ui')[2]


fetch(`https://evening-plateau-54365.herokuapp.com/theatres/1007`)
.then(resp => resp.json())
.then(movieArray=>{
    movieArray.showings.forEach(movieObj => {
       // console.log(movieObj.capacity)
        
       displayMovie(movieObj)
    });
})
.catch(error=>{
    console.error(error)
})

let displayMovie = movieObj =>{
    let movieCard = document.createElement('div')
    movieCard.className = 'card'

    let movieContent = document.createElement('div')
    movieContentclassName='content'

    let movieTitle = document.createElement('div')
    movieTitle.className = 'header'
    movieTitle.innerText = movieObj.film.title

    let movieMinutes = document.createElement('div')
    movieMinutes.className = 'meta'
    movieMinutes.innerText = `${movieObj.film.runtime} Minutes`


    let movieTicket = document.createElement('div')
    movieTicket.className = 'description'
    movieTicket.innerText = `${movieObj.tickets_sold} remaining tickets`


    let movieShowTime = document.createElement('span')
    movieShowTime.className = 'ui label'
    movieShowTime.innerText = movieObj.showtime


    let divExtra = document.createElement('div')
    divExtra.className = 'extra content'


    let ticketDivButton = document.createElement('div')
    ticketDivButton.className = 'ui blue button'
    ticketDivButton.dataset.id = movieObj.id
    ticketDivButton.innerText = 'Buy Ticket'

    movieContent.append(movieTitle,movieMinutes,movieTicket,movieShowTime)

    divExtra.append(ticketDivButton)

    movieCard.append(movieContent,divExtra)

    theatreCard.append(movieCard)

    ticketDivButton.addEventListener('click',()=>{
        let theatreCapacity = movieObj.capacity
        let ticketsSold = movieObj.tickets_sold 

        let ticketsLeft = theatreCapacity - ticketsSold

        //console.log(theatreCapacity)console.log(ticketsSold)  console.log(ticketsLeft) 
        let showingId = movieObj.id

        //fetch(`https://evening-plateau-54365.herokuapp.com/tickets/${showingId}`,{
            fetch(`https://evening-plateau-54365.herokuapp.com/theatres/1007`,{

            method: "POST",
            headers: {       'Content-Type': 'application/json',
                            'Accept': 'application/json'
             },
             body: JSON.stringify({
                tickets_sold: --movieObj.tickets_sold
             }) 
        })  
        .then(resp=>resp.json())
        .then(updatedTickets=>{
            
            movieTicket.innerText = `${movieObj.tickets_sold}`
            
            // if(movieTicket.tickets_sold === 0){
            //     ticketDivButton.innerText ='SoldOut'
            // }
            
            
            // if( movieTicket.tickets_sold > 0){
            //      movieTicket.innerText = `${movieObj.tickets_sold} remaining tickets`
            // }
            // else{
                 //  ticketDivButton.innerText ='SoldOut'
            // }

        })
    })















    
}