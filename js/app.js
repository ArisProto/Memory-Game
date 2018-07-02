// setting variables for Deckcards

const MyCards = ["fas fa-ambulance", "fas fa-fighter-jet", "fas fa-anchor","fas fa-child", "fas fa-chess-knight", "fas fa-archway", "fas fa-feather", "fas fa-dove"];
const MyDeck = MyCards.concat(MyCards);


// setting variables for resetting

const resetGame = document.querySelector(".restart");

// setting variables for move Movecounter

let movesCounter = 0;

const moves = document.querySelector('.moves-counter');
moves.innerHTML = movesCounter;

// setting variables for the Rating

const star = document.getElementById("stars").querySelectorAll(".star");

let howManyStars = document.getElementsByClassName('fa fa-star');
let starCount = 3;
let starPlur = '';

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

loop();

// Selecting a card + flip

function flip(){
  for(let i = 0; i < MyDeck.length; i++){
    allCards[i].addEventListener('click', function(evt){
      let targetClass = evt.target.className;
       if(targetClass == "card" && HowManyTimes != 2){
        allCards[i].className = ('class', 'card open show');
        movesCounter += 1;
        moves.innerHTML = movesCounter;
        if(firstCard == false ){
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
      if(movesCounter == 1){
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

// setting variables for Timer

let position = 0;
let time = 0;

const timeCounter = document.createElement('div');
timeCounter.setAttribute('class', 'timer');
resetGame.insertAdjacentElement('beforebegin', timeCounter);
timeCounter.innerText = "00:00";

// timer | help from: https://www.w3schools.com/js/js_timing.asp

function timerStart() {
  position = 1;
}

function timerStop(){
  position = 0;
}

function timerReset(){
  time = 0;
  position = 0;
}

function timer(){
  if( position == 1){
    setTimeout(() => {
      time++;
      let minutes = Math.floor(time/100/60);
      let seconds = Math.floor(time/100);
      if(minutes < 10){
        minutes = "0" + minutes;
      } if(seconds >= 60){
        seconds = seconds % 60;
      } if(seconds < 10){
        seconds = "0" + seconds;
      } timeCounter.innerHTML = "<i class='fas fa-stopwatch'></i> " + minutes + ":" + seconds;
        timer();
    }, 10);
  }
}

// Rating

function Rating() {
	if (movesCounter === 30) {
		star[2].firstElementChild.classList.remove("fa-star");
		starCount--;
	} if (movesCounter === 40) {
		star[1].firstElementChild.classList.remove("fa-star");
		starCount--;
	}
}

// Win the Game!

function winGame() {
	if (matchingCards == 16) {

    let minutes = Math.floor(time/100/60);
    let seconds = (Math.floor(time/100)) % 60;

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
    h1Html.innerText =
    `Congratulations!
    You Successfully Finished the Memory!`;
    h2Html.innerText = 'Here are your stats';
    pHtml.innerText = 
    `It took you ${moves.innerHTML} moves (${howManyStars.length + plurificationStar()})
    ${minutes} minutes and ${seconds} seconds to complete the game!`;

    function plurificationStar(){
     if(howManyStars.length === 1){
       return starPlur = " Star";
     } else {
       return starPlur = " Stars";
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

      // reset moves
      moves.innerHTML = 0;
      movesCounter = 0

       // reset Rating
      star[1].firstElementChild.classList.add("fa-star");
	    star[2].firstElementChild.classList.add("fa-star");
	    starCount = 3;

      // shuffle all cards again
      flip();
      shuffle(MyDeck);
      loop();
  });
}
reset();
