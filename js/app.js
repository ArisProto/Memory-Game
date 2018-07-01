/*
* Create a list that holds all of your cards
*/

const MyCards = ["fas fa-ambulance", "fas fa-fighter-jet", "fas fa-anchor","fas fa-child", "fas fa-chess-knight", "fas fa-archway", "fas fa-feather", "fas fa-dove"];
const MyDeck = MyCards.concat(MyCards);
const shuffleCards = shuffle(MyDeck);

let HowManyTimes = 0;
let matchingCards = 0;
let firstCard = '';
let firstParentCard = '';
let secondCard = '';
let secondParentCard = '';

// const deck = document.querySelector(".deck");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// --

const fasCards = document.querySelectorAll(".card i");
    function loop(){
        for(let i = 0; i < MyDeck.length; i++){
            fasCards[i].setAttribute('class', shuffleCards[i]);
    }
}

const allCards = document.querySelectorAll('.deck li');

// Selecting a card + flip

function flip(){
  for(let i = 0; i < MyDeck.length; i++){
    allCards[i].addEventListener('click', function(evt){
      let targetClass = evt.target.className;
      if(targetClass == "card" && HowManyTimes != 2){
        allCards[i].className = ('class', 'card open show');
      } if(firstCard == false ){
        firstCard = evt.target.firstElementChild.className;
        firstParentCard = evt.target;
        HowManyTimes += 1;
      } else {
        secondCard = evt.target.firstElementChild.className;
        secondParentCard = evt.target;
        HowManyTimes += 1;
      } function doTheyMatch(){
        if(HowManyTimes === 2){
          if(secondCard == firstCard){
            matchingCards += 2;
          }
        } setTimeout(() => {
          if(HowManyTimes === 2){
            if(secondCard == firstCard){
              firstParentCard.className = 'card open';
              secondParentCard.className = 'card open';
              HowManyTimes *= 0;
              firstCard = '';
              secondCard = '';
              firstParentCard = '';
              secondParentCard = '';
            } else {
              firstParentCard.className = 'card';
              secondParentCard.className = 'card';
              HowManyTimes *= 0;
              firstCard = '';
              secondCard = '';
              firstParentCard = '';
              secondParentCard = '';
            }
          };
        }, 500);
      }
      doTheyMatch();
    })
  }
}

flip();
loop();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
