document.addEventListener("DOMContentLoaded", () => {

    const theatreId = 1015;

    fetch("https://evening-plateau-54365.herokuapp.com/theatres/1015")
    .then(r => r.json())
    .then((moviesInfo) =>{ 
        moviesInfo.showings.forEach(showingsList)

    })
// closes second .then statement

    function showingsList(showingObj){
        
        let showingsDiv= document.querySelector(".showings")
        let theCard=document.createElement("div")
        theCard.className= "card"
        let theContent= document.createElement("div")
        theContent.className= "content"
        let theHeader= document.createElement("div")
        theHeader.className= "header"
        theHeader.innerText=showingObj.film["title"]
        let theRunTime= document.createElement("div")
        theRunTime.className= "meta"
        theRunTime.innerText= `${showingObj.film["runtime"]} minutes`
        let ticketsRemaining= document.createElement("div")
        ticketsRemaining.innerText= `${showingObj.capacity-showingObj.tickets_sold} remaining tickets`
        ticketsRemaining.className= "description"
        let theShowTime= document.createElement("span")
        theShowTime.className= "ui label"
        theShowTime.innerText= showingObj.showtime
        let theExtraContent= document.createElement("div")
        theExtraContent.className= "extra content"
        let theBuyTicketsButton= document.createElement("button")
        theBuyTicketsButton.className= "ui blue button"
        
        if (ticketsRemaining == 0      ){
            theBuyTicketsButton.innerText= "sold out"
            
        }
        // closes out the if statement 
        else {
            theBuyTicketsButton.innerText= "Buy ticket"
        }
        // closes out the else statement

        theContent.append(theHeader, theRunTime, ticketsRemaining, theShowTime)
        theExtraContent.append(theBuyTicketsButton)
        theCard.append(theContent, theExtraContent)
        showingsDiv.append(theCard)

        theBuyTicketsButton.addEventListener("click", event => {

            ticketsRemaining.innerText= `${(showingObj.capacity-showingObj.tickets_sold)} remaining tickets`

            ticketsRemaining== 0 ?  theBuyTicketsButton.innerText= "sold out" : theBuyTicketsButton.innerText= "Buy ticket";

            if (ticketsRemaining==0) {
            // disable the button so that the user cannot purchase a ticket--I did not get this one working yet
            theBuyTicketsButton.disable()
            }
            // closes out the if statement
            
            fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                // closes out headers
                body: JSON.stringify({
                    showing_id: showingObj.id
                    })
                // closes out body

            })
            // closes out the first part of the fetch
            .then(r => r.json())
            .then((response) => {
                showingObj.tickets_sold+=1
                ticketsRemaining.innerText= `${(showingObj.capacity-showingObj.tickets_sold)} remaining tickets`
 

            })
            // closes out the second .then

            

        })
        // closes out the eventListener for buytickets button



    }
    // closes out showingsList function


















})
// closes DOM content loaded event listener