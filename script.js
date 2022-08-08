const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS =[
  [0,1,3],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const cellElements = document.querySelectorAll("[data-cell")
const board = document.getElementById("board")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const winningMessageElem = document.getElementById("winningMessage")

let circleTurn

cellElements.forEach(cell => {
  cell.addEventListener('click', handleClick, {once: true} )
})

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell,currentClass)
  if (checWin(currentClass)){
    console.log("winner")
    endGame(false)
  }

  // Check for Win
  // Check for draw
  swapTurns()
  setBoardHoverClass()
}

function placeMark(cell,currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}


function checWin(currentClass){
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}


function endGame(draw) {
  if (draw) {

  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins!`
  }
  winningMessageElem.classList.add("show")
}
