// ===============================first try============================================

const theatreId = 1027;

let showingsDiv = document.querySelector('.showings')
let showingUl = document.createElement('ul')
let buyticketDiv = document.querySelector('.sub')



function getShowings(){
  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
  .then(r => r.json())
  .then((theatre) => {
    
      theatre.showings.forEach(showing => {
        
          renderShowing(showing)
      });

  })
}


function renderShowing(showing){
 let showingli = document.createElement('li')
 let buyButton = document.createElement('button')
 let ticketCountH4 = document.createElement('h4')
 let ticketsSold = showing.tickets_sold

 ticketCountH4.innerText = showing.capacity
 buyButton.innerText = "buy ticket"
 buyButton.id = showing.id
 showingli.innerText = showing.film.title

 buyButton.append(ticketCountH4)
 showingli.append(buyButton)
 showingUl.append(showingli)
 showingsDiv.append(showingli)

 buyButton.addEventListener('click',(evt) => {
    
     console.log(ticketCountH4.innerText)
     console.log(ticketsSold)

     if (ticketsSold === 20) {
        buyButton.innerText = "sold out"
     } else {
        fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
            method:'POST',
           headers: { 
               'Content-type': 'application/json'
           },
           body: JSON.stringify({
             showing_id:showing.id
            })
          })
          .then(r => r.json())
          .then((response) => {
              console.log(response)
              ticketCountH4.innerText --
          })
     }

 })
 

}


getShowings()

// =======================================================================================



// ==================second try is commented out because its a refactor ======================================


// const theatreId = 1027;

// let showingCardDiv = document.querySelector('.showings')
// {/* <div class="ui cards showings"></div> */}

// function getShowings(){
//     fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
//     .then(r => r.json())
//     .then((theatre) => {
      
//         theatre.showings.forEach(showing => {
//           console.log(showing)
//             renderShowing(showing)
//         });
  
//     })
//   }

//   function renderShowing(showing){

//     let showingContainerDiv = document.createElement('div')

//     showingContainerDiv.innerHTML = `<div class="card">
//     <div class="content">
//       <div class="header">
//         ${showing.film.title}
//       </div>
//       <div class="meta">
//         ${showing.film.runtime} minutes
//       </div>
//       <div class="description">
//         ${showing.capacity} remaining tickets
//       </div>
//       <span class="ui label">
//         ${showing.showtime}
//       </span>
//     </div>
//     <div class="extra content">
//       <div class="ui blue button">Buy Ticket</div>
//     </div>
//   </div>`

//   let ticketAmount = showingContainerDiv.querySelector('.description')
//   let buyTicketBtn = showingContainerDiv.querySelector('.button')
//   buyTicketBtn.id = showing.id
  
//   let ticketsSold = showing.film.tickets_sold
//         buyTicketBtn.addEventListener('click',(evt) => {

//             ticketAmount.innerText = `${showing.capacity --} remaining tickets`

//             console.log(evt.target.id)

//             if (ticketsSold === 20 ) {
//                 buyTicketBtn.innerText = "sold out"
//              } else {
//                 fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
//                     method:'POST',
//                    headers: { 
//                        'Content-type': 'application/json'
//                    },
//                    body: JSON.stringify({
//                      showing_id:showing.id
//                     })
//                   })
//                   .then(r => r.json())
//                   .then((response) => {
//                       console.log(showing.capacity)
//                       console.log(showing.tickets_sold)

//                       ticketAmount.innerHTML = `${showing.capacity --} remaining tickets`
                      
//                   })
//              }
          
//         })
    
//          showingCardDiv.append(showingContainerDiv)

//   }

//   getShowings()
