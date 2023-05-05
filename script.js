let board = [];
let empty = "e";

const pieces = document.querySelectorAll(".piece");
const squares = document.querySelectorAll(".square");
let beingDragged;
let prevSquare;


pieces.forEach(function (piece) {
    piece.addEventListener("dragstart", dragStart);
    // piece.addEventListener("dragend", dragEnd);
});

squares.forEach(function (square) {
    square.addEventListener("dragStart", dragStartSquare);
    square.addEventListener("dragover", dragOver);
    square.addEventListener("drop", dragDrop);
});

function dragStart(e) {
    beingDragged = e.target;
    console.log(beingDragged);
}

function dragStartSquare(e) {
    prevSquare = e.target;
    console.log(prevSquare);
}

function dragDrop(e) {
    let check = checkOccupied(e);

    if (check === true) {
        e.target.append(beingDragged);
    }
}

function dragOver(e) {
    e.preventDefault();
}

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
    console.log(board);
}

beginGame();

