// setting variables for Deckcards

const MyCards = ["fas fa-ambulance", "fas fa-fighter-jet", "fas fa-anchor","fas fa-child", "fas fa-chess-knight", "fas fa-archway", "fas fa-feather", "fas fa-dove"];
const MyDeck = MyCards.concat(MyCards);


// setting variables for resetting

const resetGame = document.querySelector(".restart");

// setting variables for Timer

let time;
let minutes = 0;
let seconds = 0;

const timeCounter = document.createElement('div');
timeCounter.setAttribute('class', 'timer');
resetGame.insertAdjacentElement('beforebegin', timeCounter);
timeCounter.innerText = "00:00";

// setting variables for move Movecounter

let countMoves = 0;

const moves = document.querySelector('.moves-counter');
moves.innerHTML = countMoves;

// setting variables for the Rating

const star = document.getElementById("stars").querySelectorAll(".star");

let howManyStars = document.getElementsByClassName('fa fa-star');
let starCount = 3;

// setting variables for flipping and matching

let HowManyTimes = 0;
let matchingCards = 0;
let firstCard = '';
let secondCard = '';
let firstParentCard = '';
let secondParentCard = '';

const allCards = document.querySelectorAll('.deck li');

//setting variables for winning

let container = document.querySelector('.container');

const winWindow = document.createElement('div');

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
        countMoves += 1;
        moves.innerHTML = countMoves;
        if(firstCard === false ){
          firstCard = evt.target.firstElementChild.className;
          firstParentCard = evt.target;
          HowManyTimes += 1;
        } else {
          secondCard = evt.target.firstElementChild.className;
          secondParentCard = evt.target;
          HowManyTimes += 1;
        }

      // Comparing the Cards
        function doTheyMatch(){
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
                    HowManyTimes = 0;
                    firstCard = '';
                    secondCard = '';
                    firstParentCard = '';
                    secondParentCard = '';
                  }
              };
            }, 1000);
          }
        doTheyMatch();
      }
    });
    allCards[i].onclick = (function(){
      Rating();
      const recieveTime = document.querySelector('.timer');
      if(countMoves === 1){
        if(recieveTime.innerText === "00:00"){
          timerStart();
          timer();
        }
      }
      winGame();
    });
  };
}
flip();

// timer | help from: https://www.w3schools.com/js/js_timing.asp

function timerStart() {
  status = 1;
}

function timerStop(){
  status = 0;
}

function timerReset(){
  time = 0;
  status = 0;
}

function timer() {
	time = setInterval(function() {
		seconds++;
		if (seconds === 60) {
      minutes++;
			seconds = 0;
		} timeCounter.innerHTML = "<i class='fas fa-stopwatch'></i>" + " Timer: " + minutes + " min " + seconds + " sec" ;
      timer();
	}, 1000);
}

// Rating

function Rating() {
	if (moves === 30) {
		star[2].firstElementChild.classList.remove("fa-star");
		starCount--;
	} if (moves === 40) {
		star[1].firstElementChild.classList.remove("fa-star");
		starCount--;
	}
}

// Win the Game!

function winGame() {
	if (matchingCards === 16) {

    // create html
    const divHtml = document.createElement('div');
    const h1Html = document.createElement('h1');
    const h2Html = document.createElement('h2');
    const pHtml = document.createElement('p');

    // give it a class
    divHtml.setAttribute('class', 'finished');
    const inside = document.createElement('div');
    inside.setAttribute('class', 'finished-inner');
    divHtml.appendChild(inside);

    // insert it into the html
    container.insertAdjacentElement('afterbegin', divHtml);
    inside.appendChild(h1Html);
    inside.appendChild(h2Html);
    inside.appendChild(pHtml);

    // add text
    h1Html.innerText = 'Congratulations!' + ' \n ' + 'You Successfully Finished the Memory!';
    h2Html.innerText = 'Here are your stats';
    pHtml.innerText = 'It took you ' + moves + ' moves (' + howManyStars.length + plurificationStar() + '),\n ' + minutes + ' minutes and ' + seconds + ' seconds to complete the game!';

    function plurificationStar(){
     if(howManyStars.length === 1){
       return starsString = " Star";
     } else {
       return starsString = " Stars";
     }
    }

    // add play again button
    const playAgain = document.createElement('a');
    const playAgainText = document.createTextNode("Play again");
    playAgain.appendChild(playAgainText);
    playAgain.title = "Play again";
    playAgain.href = "index.html";
    inside.appendChild(playAgain);

    // call functions
    matchingCards = 0;
    timerStop();
    reset();
	}
}

// Reset the Game

function reset(){
  resetGame.onclick = (function(){
    timerReset();
    for(let i = 0; i < MyDeck.length; i++){
      allCards[i].setAttribute('class', 'card');
    } HowManyTimes = 0;
      firstCard = '';
      secondCard = '';
      firstParentCard = '';
      secondParentCard = '';

       // reset Rating
      star[1].firstElementChild.classList.add("fa-star");
	    star[2].firstElementChild.classList.add("fa-star");
	    starCount = 3;

	    // reset moves
	    movesCount.innerHTML = 0;

      // shuffle all cards again
      flip();
      shuffle(MyDeck);
      loop();
  });
}
reset();
