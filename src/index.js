// SYNTAX ON THE HTML "CLASSES" MADE ME WASTE THE 45 MINUTES OF THE CHALLENGE


const theatreId = 1009;

const allCardsDiv = document.querySelector('.ui-cards-showings')




// start function
let theatreFetchFunc = () => {

    fetch(`https://evening-plateau-54365.herokuapp.com/theatres/1009`)
    .then(resp => resp.json())
.   then((theatre) => {

        let movieShowings = theatre.showings

        movieShowings.forEach((showing) => {
            showListFunc(showing)

        });
    })

    
}
// end function
theatreFetchFunc()



// start function
let showListFunc = (showing) => {

    let cardDiv = document.createElement('div')
    cardDiv.className = '.card'
    let contentDiv = document.createElement('div')
    contentDiv.className = '.content'
    


    let headerDiv = document.createElement('div')
    headerDiv.innerText = showing.film.title
    headerDiv.className = '.header'

    let metaDiv = document.createElement('div')
    metaDiv.innerText = `${showing.film.runtime} Minutes`
    metaDiv.className = '.meta'



    let descDiv = document.createElement('div')
    descDiv.className = '.description'
    

   


    allCardsDiv.append(cardDiv)
    cardDiv.append(contentDiv)
    contentDiv.append(headerDiv, metaDiv, descDiv)
    
    
}
// end function



