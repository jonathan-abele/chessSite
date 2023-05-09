let startBoard = [];
let board = [];
let empty = "  ";

const pieces = document.querySelectorAll(".piece");
const squares = document.querySelectorAll(".square");
let isSelected = false;
let currentPiece = null;
let prevSquare = null;
let whiteMove = true;

squares.forEach(function (square) {
    square.addEventListener("click", function(e) {
        if (isSelected === true && allowed(square)) {


            prevSquare.removeChild(currentPiece);
            while (square.firstChild) {
                square.removeChild(square.firstChild);
            }
            square.append(currentPiece);
            changeColor(square);
            updateBoard(square);

            // change whos turn it is\
            if (whiteMove) {
                whiteMove = false;
            } else {
                whiteMove = true;
            }

            isSelected = false;
            prevSquare = null;
        } else {
            if (square.hasChildNodes() && checkTurn(currentPiece)) {
                resetColors();
                isSelected = true;
                prevSquare = square;
                changeColor(square);
            }
        }
    });
});

// mousedown event to pick up piece
pieces.forEach(function (piece) {
    piece.addEventListener("click", function(e) {
        if (isSelected === false) {
            currentPiece = piece;
        }
    });
});

// checks if the piece is allowed to move to the square
function allowed(square) {
    const colorWhite = currentPiece.classList.contains('w');
    if (!square.hasChildNodes()) {
        return true;
    } else if (colorWhite && square.firstChild.classList.contains('w')) {
        return false;
    } else if (!colorWhite && square.firstChild.classList.contains('b')) {
        return false;
    } else {
        return true;
    }
}

// checks if the piece selected is allowed to move based on whos turn it is
function checkTurn(piece) {
    if (piece.classList.contains('w') && whiteMove) {
        return true;
    } else if (piece.classList.contains('b') && !whiteMove) {
        return true;
    } else {
        return false;
    }
}

// changes the color of the square when it is selected
function changeColor(square) {
    if (square.classList.contains("black")) {
        square.style.backgroundColor = "#5C8752";
    } else {
        square.style.backgroundColor = "#BDF4B0";
    }
}

// resets all the colors on the board to the normal white and black
function resetColors() {
    squares.forEach(function(square) {
        if (square.classList.contains("black")) {
            square.style.backgroundColor = "#999";
        } else {
            square.style.backgroundColor = "#FFF";
        }
    });
}

// updates the 2d array board based on piece movement
function updateBoard(square) {
    const old = prevSquare.id;
    const oldRow = Math.floor(old / 8);
    const oldCol = old % 8;;
    board[oldRow][oldCol] = empty;

    const sq = square.id;
    const sqRow = Math.floor(sq / 8);
    const sqCol = sq % 8;
    board[sqRow][sqCol] = identifyPiece(currentPiece);
    
    console.log(board);
}

// returns which piece is selected
function identifyPiece(piece) {
    if (piece.classList.contains('b')) { // black pieces
        if (piece.classList.contains('pawn')) {
            return "BP"
        } else if (piece.classList.contains('rook')) {
            return "BR"
        } else if (piece.classList.contains('bishop')) {
            return "BB"
        } else if (piece.classList.contains('knight')) {
            return "BN"
        } else if (piece.classList.contains('king')) {
            return "BK"
        } else if (piece.classList.contains('queen')) {
            return "BQ"
        } 
    } else { // white pieces
        if (piece.classList.contains('pawn')) {
            return "WP"
        } else if (piece.classList.contains('rook')) {
            return "WR"
        } else if (piece.classList.contains('bishop')) {
            return "WB"
        } else if (piece.classList.contains('knight')) {
            return "WN"
        } else if (piece.classList.contains('king')) {
            return "WK"
        } else if (piece.classList.contains('queen')) {
            return "WQ"
        } 
    }
}

// creates the 2d array board with the starting position
function beginBoard() {
    const row0 = [];
    row0.push("BR");
    row0.push("BN");
    row0.push("BB");
    row0.push("BQ");
    row0.push("BK");
    row0.push("BB");
    row0.push("BN");
    row0.push("BR");
    const row1 = [];
    for (let i = 0; i < 8; ++i) {
        row1.push("BP");
    }
    const row6 = [];
    for (let i = 0; i < 8; ++i) {
        row6.push("WP");
    }
    const row7 = [];
    row7.push("WR");
    row7.push("WN");
    row7.push("WB");
    row7.push("WQ");
    row7.push("WK");
    row7.push("WB");
    row7.push("WN");
    row7.push("WR");

    const emptyRow1 = [];
    for (let i = 0; i < 8; ++i) {
        emptyRow1.push(empty);
    }
    const emptyRow2 = [];
    for (let i = 0; i < 8; ++i) {
        emptyRow2.push(empty);
    }
    const emptyRow3 = [];
    for (let i = 0; i < 8; ++i) {
        emptyRow3.push(empty);
    }
    const emptyRow4 = [];
    for (let i = 0; i < 8; ++i) {
        emptyRow4.push(empty);
    }

    board.push(row0);
    board.push(row1);
    board.push(emptyRow1);
    board.push(emptyRow2);
    board.push(emptyRow3);
    board.push(emptyRow4);
    board.push(row6);
    board.push(row7);
}

function setBoard() {
    let square;
    let id;
    for (let r = 0; r < 8; ++r) {
        for (let c = 0; c < 8; ++c) {
            id = (r * 8 + c).toString();
            square = document.getElementById(id);

            if (board[r][c] === "  ") {
                square.removeChild(square.firstChild);
            }
        }
    }
}

function reset() {
    board = startBoard;
    setBoard();
}

const beginGame = () => {
    beginBoard();
    startBoard = JSON.parse(JSON.stringify(board));
}


beginGame();

