let board = [];
let empty = "e";

const pieces = document.querySelectorAll(".piece");
const squares = document.querySelectorAll(".square");
let currentSquare = null;
let isDragging = false;
let currentPiece = null;
let prevSquare = null;

squares.forEach(function (square) {
    square.addEventListener("mouseup", function(e) {
        console.log(square);
        if (isDragging) {
            prevSquare.removeChild(currentPiece);
        }
    });
}) 

// mousedown event to pick up piece
pieces.forEach(function (piece) {
    piece.addEventListener("mousedown", function(e) {
        isDragging = true;
        currentPiece = piece;
    });
});

// mousedown event for previous square
squares.forEach(function (square) {
    square.addEventListener("mousedown", function(e) {
        prevSquare = square;
    })
})

// mousemove event listener for piece to follow mouse
document.addEventListener("mousemove", function(e) {
    if (isDragging) {
        currentPiece.style.position = 'absolute';
        currentPiece.style.left = (e.pageX - currentPiece.width / 2) + 'px';
        currentPiece.style.top = (e.pageY - currentPiece.height / 2) + 'px';
    }
});


// mouseup event listener for dropping the piece
document.addEventListener("mouseup", function(e) {
    isDragging = false;
    currentPiece.style.position = 'static';
    currentPiece = null;
});


function beginBoard() {
    const row0 = [];
    row0.push("black_rook");
    row0.push("black_knight");
    row0.push("black_bishop");
    row0.push("black_queen");
    row0.push("black_king");
    row0.push("black_bishop");
    row0.push("black_knight");
    row0.push("black_rook");
    const row1 = [];
    for (let i = 0; i < 8; ++i) {
        row1.push("black_pawn");
    }
    const row6 = [];
    for (let i = 0; i < 8; ++i) {
        row6.push("white_pawn");
    }
    const row7 = [];
    row7.push("white_rook");
    row7.push("white_knight");
    row7.push("white_bishop");
    row7.push("white_queen");
    row7.push("white_king");
    row7.push("white_bishop");
    row7.push("white_knight");
    row7.push("white_rook");

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
}

beginGame();

