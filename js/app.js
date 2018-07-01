// setting variables for Deckcards

const MyCards = ["fas fa-ambulance", "fas fa-fighter-jet", "fas fa-anchor","fas fa-child", "fas fa-chess-knight", "fas fa-archway", "fas fa-feather", "fas fa-dove"];
const MyDeck = MyCards.concat(MyCards);

// setting variables for Timer

const timeCounter = document.querySelector(".timer");

let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

// setting variables for move Movecounter

const movesCount = document.querySelector(".moves-counter");
let moves = 0;

// setting variables for the Rating

const star = document.getElementById("stars").querySelectorAll(".star");
let starCount = 3;

// setting variables for flipping and matching

const allCards = document.querySelectorAll('.deck li');

let HowManyTimes = 0;
let matchingCards = 0;
let firstCard = '';
let secondCard = '';
let firstParentCard = '';
let secondParentCard = '';

// setting variables for resetting

const resetGame = document.querySelector(".restart");

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
      if (startTime === false) {
        startTime = true;
      } if(targetClass == "card" && HowManyTimes != 2){
        allCards[i].className = ('class', 'card open show');
      } if(firstCard == false ){
        firstCard = evt.target.firstElementChild.className;
        firstParentCard = evt.target;
        HowManyTimes += 1;
      } else {
        secondCard = evt.target.firstElementChild.className;
        secondParentCard = evt.target;
        HowManyTimes += 1;

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
      movesCounter();
      Rating();
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

// move counter

function movesCounter() {
	movesCount.innerHTML ++;
	moves ++;
}

// Rating

function Rating() {
	if (moves === 24) {
		star[2].firstElementChild.classList.remove("fa-star");
		starCount--;
	} if (moves === 40) {
		star[1].firstElementChild.classList.remove("fa-star");
		starCount--;
	}
}

function stopTime() {
	clearInterval(time);

// restart

function reset(){
  resetGame.onclick = (function(){
    for(let i = 0; i < MyDeck.length; i++){
      allCards[i].setAttribute('class', 'card');
    } HowManyTimes *= 0;
      firstCard = '';
      secondCard = '';
      firstParentCard = '';
      secondParentCard = '';

      //reset all stars

      stopTime();
	    startTime = false;
	    seconds = 0;
	    minutes = 0;
      timeCounter.innerHTML = "<i class='fa fas fa-stopwatch'></i>" + " Timer: 00:00";

       // reset Rating
      star[1].firstElementChild.classList.add("fa-star");
	    star[2].firstElementChild.classList.add("fa-star");
	    starCount = 3;

	    // reset moves
	    moves = 0;
	    movesCount.innerHTML = 0;

      // shuffle all cards again
      flip();
      shuffle(MyDeck);
      loop();
    });
}
reset();
