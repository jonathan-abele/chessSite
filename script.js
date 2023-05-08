let board = [];
let empty = "  ";

const pieces = document.querySelectorAll(".piece");
const squares = document.querySelectorAll(".square");
let isSelected = false;
let currentPiece = null;
let prevSquare = null;

squares.forEach(function (square) {
    square.addEventListener("click", function(e) {
        if (isSelected === true) {
            prevSquare.removeChild(currentPiece);
            square.append(currentPiece);
            changeColor(square);
            updateBoard(square);
            isSelected = false;
            prevSquare = null;
        } else {
            if (square.hasChildNodes()) {
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

function changeColor(square) {
    if (square.classList.contains("black")) {
        square.style.backgroundColor = "#5C8752";
    } else {
        square.style.backgroundColor = "#BDF4B0";
    }
}

function resetColors() {
    squares.forEach(function(square) {
        if (square.classList.contains("black")) {
            square.style.backgroundColor = "#999";
        } else {
            square.style.backgroundColor = "#FFF";
        }
    });
}

function updateBoard(square) {
    const old = prevSquare.id;
    const oldRow = Math.floor(old / 8);
    const oldCol = old % 8;;
    board[oldRow][oldCol] = empty;

    const sq = square.id;
    const sqRow = Math.floor(sq / 8);
    const sqCol = sq % 8;
    console.log(board[sqRow][sqCol])
    board[sqRow][sqCol] = identifyPiece(currentPiece);
    console.log(board[sqRow][sqCol])
    console.log(sqRow);
    console.log(sqCol);
    
    console.log(board);
}

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

    const emptyRow = [];
    for (let i = 0; i < 8; ++i) {
        emptyRow.push(empty);
    }

    board.push(row0);
    board.push(row1);
    for (let i = 0; i < 4; ++i) {
        board.push(emptyRow);
    }
    board.push(row6);
    board.push(row7);
}

function checkOccupied(e) {
    const squareNum = e.target.id;
    const row = Math.floor(squareNum / 8);
    const col = squareNum % 8;
    
    if (board[row][col] === "e") {
        return true;
    } else {
        return false;
    }
}

const beginGame = () => {
    beginBoard();
    console.log(board);
}

beginGame();

