const theatreId = 1032;

const navBar = document.querySelector(".ui inverted red menu")



fetch(`https://evening-plateau-54365.herokuapp.com/theatres/1032`)
.then(r => r.json())
.then(theatreData => 
    theatreData.showings.forEach(showingData => {
        renderShowings(showingData)
    })
)

function renderShowings(showingData) {
    const showingBar = document.querySelector(".ui cards showings")
    document.getElementsByClassName(".ui cards showings").className("uicardsshowings")
    // let showBar = ".ui cards showings"
    let showingsBar = document.createElement("div")
        showingsBar.className = "showings"
    let cardDiv = document.createElement("div")
        cardDiv.className = "card"
    let contentDiv = document.createElement("div")
        contentDiv.className = "content"
    let headerDiv = document.createElement("div")
        headerDiv.className = "header"
        headerDiv.innerText = showingData.film.title
    let metaDiv = document.createElement("div")
        metaDiv.className = "meta"
        metaDiv.innerText = showingData.film.runtime
    let descriptionDiv = document.createElement("div")
        descriptionDiv.className = "description"
    let uiLabelSpan = document.createElement("span")
        uiLabelSpan.className = "ui label"
        uiLabelSpan.innerText = showingData.film.showtime
    let extraContentDiv = document.createElement("div")
        extraContentDiv.className = "extra content"
    let uiBlueButtonDiv = document.createElement("div")
        uiBlueButtonDiv.className = "ui blue button"
        uiBlueButtonDiv.innerText = "Buy Ticket"

    contentDiv.append(headerDiv, metaDiv, descriptionDiv, uiLabelSpan)
    extraContentDiv.append(uiBlueButtonDiv)
    cardDiv.append(contentDiv, extraContentDiv)
    showingBar.append(cardDiv)
    

    // showingsBar.append(cardDiv)
    // showBar.append(cardDiv)
}