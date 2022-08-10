const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS =[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const cellElements = document.querySelectorAll("[data-cell")
const marksOptionsMessage = document.getElementById("instructions")
const marksOptions = document.querySelectorAll("[data-marks")
const board = document.getElementById("board")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const winningMessageElem = document.getElementById("winningMessage")
const restartButton = document.getElementById("restartButton")
const statusMessage = document.getElementById("status")

let circleTurn
let playerOne

marksOptions.forEach(option => {
  option.addEventListener('click', pickMark, {once: true} )
})

restartButton.addEventListener("click", startGame)


function pickMark(e){
  if (e.target.className === "oes") {
    circleTurn = true
    playerOne = "O"
  } else {
    circleTurn = false
    playerOne = "X"
  }
  marksOptionsMessage.classList.add("hide")
  startGame(circleTurn)
}

function startGame(circleTurn) {
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once: true} )
  })
  setStatus()
  setBoardHoverClass(circleTurn)
  winningMessageElem.classList.remove("show")

}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell,currentClass)
  if (checWin(currentClass)){
    endGame(false)
  } else if (isDraw()){
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
    setStatus()
  }
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
    winningMessageTextElement.innerText = `Draw!`
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins!`
  }
  winningMessageElem.classList.add("show")
}

function isDraw() {
  return [...cellElements].every( cell => {
    return cell.classList.contains(X_CLASS) ||
    cell.classList.contains(CIRCLE_CLASS)
  })
}

function setStatus () {
  let marksTurn
  let player
  if(circleTurn){
   marksTurn = "O"
  } else {
    marksTurn = "X"
  }
  if (playerOne === marksTurn){
    player = 1
  } else {
    player = 2
  }
  statusMessage.innerText =`Player ${player}'s turn to make a move with an ${marksTurn}`
}
