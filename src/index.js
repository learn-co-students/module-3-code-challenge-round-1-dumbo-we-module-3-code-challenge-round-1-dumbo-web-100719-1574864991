const theatreId = 1024;
const ulCard = document.createElement('ul');
const cardsShowing = document.querySelector(".showings")



fetch('https://evening-plateau-54365.herokuapp.com/theatres/1024') //eslint-disable-line
  .then(response => response.json())
  .then(arr => {
      arrOfCards = arr.showings;

      for(let element of arrOfCards)
      {
          showAllMovies(element);
      }
  })

  function showAllMovies(element)
  {    
    //   let liCreate = document.createElement("li")

    //   let nameOfMovie = element.film["title"];
    //   let runTimeOfMOvie = element.film["runtime"];
    //   let capacityOfMovie = element.capacity;
    //   let showTimeOfMovie = element.showtime;
    //   let soldTicketsOfMovie = element.tickets_sold;
    //   let buttonOfMovie  = document.createElement('button');
    //   buttonOfMovie.innerText = "Buy Ticket"
    //   buttonOfMovie.id = "button-id"
     
     cardsShowing.innerHTML += `
     <div class="card">
         <div class="content">
    <div class="header">
        ${element.film["title"]}
            </div>
    <div class="meta">
      ${element.film["runtime"]}
    </div>
    <div class="description">
      ${element.tickets_sold}
    </div>
    <span class="ui label">
      ${element.showtime}
    </span>
  </div>
  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>
</div>`
      

    //   liCreate.append(nameOfMovie,runTimeOfMOvie,capacityOfMovie,showTimeOfMovie,soldTicketsOfMovie,buttonOfMovie);  
    //   cardsShowing.append(liCreate);
      
      let divCard = document.querySelector(".card")
      

      divCard.addEventListener('click', (event)=>{
        let descriptionCard = document.querySelector('.description')
        descriptionCard.innerText = `${element.tickets_sold +=1 }`


       

  
    fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, { //eslint-disable-line 
        method: 'POST',
     headers: {
      'content-type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      showing_id: element.id
    })
    })
    .then(response => response.json())
    .then( element => {
        
    })

    })
  }


  