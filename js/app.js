/*
* Create a list that holds all of your cards
*/

const MyCards = ["fas fa-ambulance", "fas fa-fighter-jet", "fas fa-anchor","fas fa-child", "fas fa-chess-knight", "fas fa-archway", "fas fa-feather", "fas fa-dove"];
const MyDeck = MyCards.concat(MyCards);
const shuffleCards = shuffle(MyDeck);

let openedCardsNum = 0;

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

const cardsI = document.querySelectorAll(".card i");
    function looping(){
        for(let i = 0; i < MyDeck.length; i++){
            cardsI[i].setAttribute('class', shuffleCards[i]);
    }
}

const deckLi = document.querySelectorAll('.deck li');

// Selecting a card + flip

function listener(){
  for(let i = 0; i < MyDeck.length; i++){
    deckLi[i].addEventListener('click', function(evt){
      let targetClass = evt.target.className;
      if(targetClass == "card" && openedCardsNum != 2){
        deckLi[i].className = ('class', 'card open show');
      }
    })
  }
}

if(cardOne == false ){
  cardOne = evt.target.firstElementChild.className;
  cardOneParent = evt.target;
  openedCardsNum += 1;
} else {
  cardTwo = evt.target.firstElementChild.className;
  cardTwoParent = evt.target;
  openedCardsNum += 1;
}

function cardClasses(){
  if(openedCardsNum === 2){
    if(cardTwo == cardOne){
      matchedCards += 2;
    }
  } setTimeout(() => {
    if(openedCardsNum === 2){
      if(cardTwo == cardOne){
        cardOneParent.className = 'card open match';
        cardTwoParent.className = 'card open match';
        openedCardsNum *= 0;
        cardOne = '';
        cardTwo = '';
        cardOneParent = '';
        cardTwoParent = '';
      } else {
        cardOneParent.className = 'card';
        openedCardsNum *= 0;
        cardTwoParent.className = 'card';
        cardOne = '';
        cardTwo = '';
        cardOneParent = '';
        cardTwoParent = '';
      }
    };
  }, 1000);}

cardClasses();
listener();
looping();

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
