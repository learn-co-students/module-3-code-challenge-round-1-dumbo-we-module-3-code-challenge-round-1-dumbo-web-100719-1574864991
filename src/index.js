const theatreId = 1014;
const cardShowingDiv = document.querySelector(".cards")


// fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
// .then(resp => resp.json())
// .then(theatreShows => {
//     theatreShows.forEach(show => {
//         console.log(show)
//     });
// })

fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`, {
  method:'GET',
 headers: { 
     'Content-type': 'application/json',
     'accept': 'application/json'
 },
})
.then(resp => resp.json())
.then(function(resp){
resp.showings.forEach(show => {
    showIntoCard(show)
});
})

function showIntoCard(show){

    //testing inner vs 

let showCard = document.createElement("div")
    showCard.className="card"
    
// let showHeader = document.createElement("div")
//     showHeader.className="header"
//     showHeader.innerText=`${show['film'].title}`


// let showRuntime = document.createElement("div")
//     showRuntime.className="meta"

// let showDesc = document.createElement("div")
//     showDesc.className="description"

// let showTime = document.createElement("span")
// showTime.className= "ui label"



// let showButton = document.createElement("button")
// showButton.className ="ui blue button"

// let showExtra = document.createElement("div")
//     showExtra.className = "extra content"
//     showExtra.innerHTML = showButton

// showCard.append(showHeader,showRuntime ,showDesc,showTime )

// cardShowingDiv.append(showCard)



showCard.innerHTML = `<div class="card">

  <div class="content">
    <div class="header">
     ${show['film'].title}
    </div>

    <div class="meta">
    ${show['film'].runtime} minutes
    </div>

    <div class="description">
    ${show['capacity']}
    </div>


    <span class="ui label">
    ${show['showtime']} 
    </span>
  </div>

  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>

</div>`


cardShowingDiv.append(showCard)

showCard.addEventListener("click",(evt) => {
    console.log(evt.target)

    debugger
})



}   



