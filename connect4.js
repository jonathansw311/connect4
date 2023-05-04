//  Connect Four

//  * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
//  * column until a player gets four-in-a-row (horiz, vert, or diag) or until
//  * board fills (tie)
//  */

const WIDTH = 7;
const HEIGHT = 6;
let p1Wins;//to keep track of wins
let p2Wins;

let currPlayer = 1; // active player: 1 or 2
let board = makeBoard2(); 

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
//makeBoard dynamically fills the board array
function makeBoard2(){
     let aboard2=[];//init array
    for (h=0; h<HEIGHT; h++){
       aboard2.push([0])//pushes new array into array
    for(w = 0; w< WIDTH; w++){
     aboard2[h][w]=null;//fills new array with null
    }
}
return aboard2;
}

//the below function is not used and probably should
//be delete as some point
function makeBoard() {
// just using the static board array to get us up and running will change to dynamic later
const board =[
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
  ]; // array of rows, each row is array of cells  (board[y][x])
 return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');// added the query selector
  // TODO: add comment for this code
  const top = document.createElement("tr");//creates table row for top of table
  top.setAttribute("class", "column-top");//inserts class of column top for top of table. changed from id to be more flexable in styling
  top.setAttribute("class", 'pl1')//adds player one class to top of row
  top.addEventListener("click", handleClick);//event listener

  for (var x = 0; x < WIDTH; x++) {//runs a loop, set x and runs accross for the width for the top of the board
    var headCell = document.createElement("td");//creates TD
    headCell.setAttribute("id", x);//sets class of id to the row
    top.append(headCell);//appends
  }
  htmlBoard.append(top);// adds board to the dom

  // TODO: add comment for this code
  for (var y = 0; y < HEIGHT; y++) {//runs a loop, sets id for height for the game board
    const row = document.createElement("tr");//creates TR's for the board
    for (var x = 0; x < WIDTH; x++) {//next loop for the game board for the td's
      const cell = document.createElement("td");//
      cell.setAttribute("id", `${y}-${x}`);//sets id for the row and height
      cell.setAttribute("class", 'gBoard');//since we removed the id to change classes on its parent we added a class of gboard for styling
      row.append(cell);//puts the cell into the row
    }
    htmlBoard.append(row);//puts the row into the html board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
//finds the next emply array positoin and sets it it to y
function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y=HEIGHT-1; y>=0; y--){//runs a loop starting from the bottom the the column
        if (board[y][x]=== null){//if the column at in row is null, that is the next open postion in the board
      return y;//the specific row is returned
    }
  }
  
  return null; //if we have reached all the way to the top
}

/** placeInTable: update DOM to place piece into HTML table of board */
//this positions the playing piece, as a div, into the html table
function placeInTable(y, x) {
  const playBoard = document.getElementById(y+'-'+x);// added the query selector to get where we want to place the playing piece

  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div")//creats a div for the piece
  piece.setAttribute('class', "piece p"+currPlayer);//adds class of piece and current player for css(used for color)
  playBoard.append(piece);//appends the piece into the board
}

/** endGame: announce game end */
// the below function is called when the end of game is reached either through a tie
//or when a winner has been determined
function endGame(msg) {
 // TODO: pop up alert message
 swapPlayers();
 if (msg === (filled)){//filled will be true if the board is filled
 setTimeout(function(){//we set this time out becuase without it the games calls the game before last piece is shown
  if(confirm(`No Winner Tie Game!!`)){
    window.location.reload();  
}
  

}, 500);}//half second delay

 if (msg !==(filled)){
 setTimeout(function(){//we set this time out becuase without it the games calls the game before last piece is shown
  if(confirm(`Player ${currPlayer} won the game!`)){//game is reloaded after ok button pushed
    window.location.reload();  
}

updateScore();

}, 500);}
 
};


/** handleClick: handle click of column top to play piece */
// the function from the top of the game piece
function handleClick(evt) {
  // get x from ID of clicked cell//this is used to find the column that was clicked
  let x = +evt.target.id;
if(currPlayer===1){  //changes the collor of the piece on to of the game board
const tog = document.querySelector('.pl1');//after the piece is put into the html board the pieces on top change color
tog.classList.remove('pl1');
tog.classList.add('pl2');}
else{
  const tog = document.querySelector('.pl2');
tog.classList.remove('pl2');
tog.classList.add('pl1');}

  
  // get next spot in column (if none, ignore click)
  let  y = findSpotForCol(x);//y is set to the next available null space from the bottom
  if (y === null) {
    return;
  }
 
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x]=currPlayer;
  check();// looks to see if we have a winner
 
  // TODO: check if all cells in board are filled; if so call, call endGame
const flattened = board.flat();//flatens the array into one easy to read array
  
      filled = flattened.every(function (flat){//this checks to see if the board is 100% full
      return flat !== null;
         })

         if(filled){endGame(filled)};//if game board is full the game ends as a tie

// check for win

   swapPlayers();// switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    //this loop runs through every possible combinatin on the board to see if there is a array four long of same same player
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
        
    );
    
  }

  // TODO: read and understand this code. Add comments to help you.
//this looks over every possible comgination.  some of the coordinates look like they are out of the range
  for (let y = 0; y < HEIGHT; y++) {//loops through the entire board height
    for (let x = 0; x < WIDTH; x++) {//loops throught the entire board width
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];//horizontile combinations.  starts on top row
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];//verticle combinagtions.  starts on colum zero and goes down 
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];//diag combinations.  starts on row 00 then moves down and over one
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];//diag combiantions the toher way.  starts on row 00 and moves down to left
              if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
       
        return true;//returns true if it finds a winner
      }
    }
  }
}
function swapPlayers(){
  currPlayer ===1 ? currPlayer =2 : currPlayer =1;//simple swap players function
console.log(`current player is ${currPlayer}`);
}

makeHtmlBoard();//creates html board
initScore();//initializes scoreboard


//the check function is called in the click event function whenever a new piece is placed
function check(){
  if (checkForWin()) {//checks for win here.  if check for win comes back true it ends the game
   
    return endGame(`Player ${currPlayer} won!`);
  };

}

button = document.querySelector('#reset');//selects button
button.addEventListener("click", resetPage)//event listener for button

function resetPage(){//called when reset button is clicked
  localStorage.clear();//clears local storage
  location.reload();//reloads the page
}

function updateScore(){//updates scores
currPlayer === 1 ? p1Wins++ : p2Wins ++;//adds to total score tally
wins = document.querySelector('#p1w');//selects div to insert update score into 
wins2 = document.querySelector('#p2w');//player two
score = innerHTML=(p1Wins);//loads the score into html
score2 = innerHTML=(p2Wins);//player two
wins.append(score);//adds score into webpage
wins2.append(score2);//player two
localStorage.setItem('pOneScore', p1Wins);//adds score into local storage
localStorage.setItem('pTwoScore', p2Wins);//player two
}

function initScore(){//initializes scores
  wins = document.querySelector('#p1w');//selects html
  wins2 = document.querySelector('#p2w');
  playerOneStoredScore = parseInt(localStorage.getItem('pOneScore'));//gets stored score
  playerTwoStoredScore = parseInt(localStorage.getItem('pTwoScore'))
 
  if(playerOneStoredScore >= 0)  //checks to see if the stored score is available
  {p1Wins =  parseInt(localStorage.getItem('pOneScore'));//adds the stored score into score tally
  p2Wins = parseInt(localStorage.getItem('pTwoScore'))}//player two
    else{p1Wins = 0;//if no stored score is available, the scores are initialized at zero
          p2Wins=0 }
    
  score = innerHTML=(p1Wins);//scores are added and appended
  score2 = innerHTML=(p2Wins);
  wins.append(score);
  wins2.append(score2);
}
