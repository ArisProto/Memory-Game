// setting variables for deckcards

const MyCards = ["fas fa-ambulance", "fas fa-fighter-jet", "fas fa-anchor","fas fa-child", "fas fa-chess-knight", "fas fa-archway", "fas fa-feather", "fas fa-dove"];
const MyDeck = MyCards.concat(MyCards);

// setting variables for Timer

const timeCounter = document.querySelector(".timer");

let time;
let minutes = 0;
let seconds = 0;
let startTime = false;

// setting variables for flipping and matching

const allCards = document.querySelectorAll('.deck li');

let HowManyTimes = 0;
let matchingCards = 0;
let firstCard = '';
let secondCard = '';
let firstParentCard = '';
let secondParentCard = '';

// Shuffle function from http://stackoverflow.com/a/2450976

const shuffleCards = shuffle(MyDeck);

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

// ------------------------

const fasCards = document.querySelectorAll(".card i");
    function loop(){
        for(let i = 0; i < MyDeck.length; i++){
            fasCards[i].setAttribute('class', shuffleCards[i]);
    }
}

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

        if (timeStart === false) {
    			timeStart = true;
        }
// Comparing the Cards

      } function doTheyMatch(){
        if(HowManyTimes === 2){
          if(secondCard == firstCard){
            matchingCards += 2;
          }
        } setTimeout(() => {
          if(HowManyTimes === 2){
            if(secondCard == firstCard){
              firstParentCard.className = 'card open match';
              secondParentCard.className = 'card open match';
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

// Calling the functions

flip();
loop();
timer();


// timer | used: Used: https://www.w3schools.com/js/js_timing.asp

function timer() {
	time = setInterval(function() {
		seconds++;
		if (seconds === 60) {
      minutes++;
			seconds = 0;
		} timeCounter.innerHTML = "<i class='fas fa-stopwatch'></i>" + " Timer: " + minutes + " min " + seconds + " sec" ;
	}, 1000);
}
